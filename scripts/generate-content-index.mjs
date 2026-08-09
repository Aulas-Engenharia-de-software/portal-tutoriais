import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(projectRoot, 'src', 'assets', 'conteudos');
const outputPath = join(projectRoot, 'src', 'app', 'core', 'content', 'generated-content-index.ts');
const requiredFields = ['title', 'description', 'course', 'discipline', 'module', 'category', 'type'];
const allowedTypes = new Set(['tutorial', 'atividade', 'material']);
const allowedResourceTypes = new Set(['slides', 'site', 'pdf', 'livro', 'repositorio']);

function parseValue(rawValue) {
  const value = rawValue.trim();
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  if (/^\d+$/.test(value)) return Number(value);
  if (value === 'true' || value === 'false') return value === 'true';
  return value.replace(/^['"]|['"]$/g, '');
}

function parseFrontmatter(source, filePath) {
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${filePath}: frontmatter ausente.`);
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    metadata[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  for (const field of requiredFields) {
    if (!metadata[field]) throw new Error(`${filePath}: campo obrigatório "${field}" ausente.`);
  }
  if (!allowedTypes.has(metadata.type)) {
    throw new Error(`${filePath}: type inválido "${metadata.type}".`);
  }
  if (metadata.type === 'material' && !allowedResourceTypes.has(metadata.resourceType)) {
    throw new Error(`${filePath}: materiais exigem um resourceType válido.`);
  }
  return metadata;
}

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listMarkdownFiles(path) : path.endsWith('.md') ? [path] : [];
  }));
  return nested.flat();
}

const files = (await listMarkdownFiles(contentRoot)).sort();
const content = await Promise.all(files.map(async (filePath) => {
  const source = await readFile(filePath, 'utf8');
  const metadata = parseFrontmatter(source, relative(projectRoot, filePath));
  return {
    slug: metadata.slug || basename(filePath, '.md'),
    title: metadata.title,
    description: metadata.description,
    course: metadata.course,
    discipline: metadata.discipline,
    module: metadata.module,
    category: metadata.category,
    type: metadata.type,
    tags: metadata.tags || [],
    icon: metadata.icon || 'fas fa-book-open',
    readingMinutes: metadata.readingMinutes || 5,
    updatedAt: metadata.updatedAt || '',
    featured: metadata.featured || false,
    order: metadata.order || 999,
    assetPath: `/assets/conteudos/${relative(contentRoot, filePath).replaceAll('\\', '/')}`,
    ...(metadata.resourceType ? { resourceType: metadata.resourceType } : {}),
    ...(metadata.externalUrl ? { externalUrl: metadata.externalUrl } : {}),
    ...(metadata.provider ? { provider: metadata.provider } : {}),
  };
}));

const slugs = new Set();
for (const entry of content) {
  if (slugs.has(entry.slug)) throw new Error(`Slug duplicado: ${entry.slug}`);
  slugs.add(entry.slug);
}
content.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'pt-BR'));

const output = `// Arquivo gerado por scripts/generate-content-index.mjs. Não edite manualmente.\n` +
  `import type { ContentEntry } from './content.models';\n\n` +
  `export const CONTENT_INDEX: readonly ContentEntry[] = ${JSON.stringify(content, null, 2)};\n`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, 'utf8');
console.log(`Índice gerado com ${content.length} conteúdo(s).`);
