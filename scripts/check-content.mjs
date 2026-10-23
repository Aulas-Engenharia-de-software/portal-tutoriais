import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const generated = await readFile(
  resolve(root, 'src/app/core/content/generated-content-index.ts'),
  'utf8',
);
const entries = JSON.parse(
  generated
    .slice(generated.indexOf('= [') + 2)
    .trim()
    .replace(/;$/, ''),
);
const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
const documents = new Map();
for (const entry of entries) {
  const source = await readFile(resolve(root, 'src', entry.assetPath.slice(1)), 'utf8');
  documents.set(entry.slug, marked.lexer(source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')));
}

const problems = [];
let imageCount = 0;
let jsonCount = 0;
for (const entry of entries) {
  const links = [];
  const pending = marked.walkTokens(documents.get(entry.slug), (token) => {
    if (token.type === 'image' && token.href.startsWith('/images/')) {
      imageCount++;
      return access(resolve(root, 'public', token.href.slice(1))).catch(() => {
        problems.push(`${entry.slug}: imagem ausente ${token.href}`);
      });
    }
    if (token.type === 'link' && token.href.startsWith('/tutoriais/')) {
      const slug = token.href.slice('/tutoriais/'.length).split('#')[0].split('?')[0];
      links.push(slug);
      if (!bySlug.has(slug))
        problems.push(`${entry.slug}: link de tutorial não canônico ou inexistente ${token.href}`);
    }
    if (token.type === 'code' && token.lang === 'json') {
      jsonCount++;
      try {
        JSON.parse(token.text);
      } catch {
        problems.push(`${entry.slug}: bloco JSON inválido`);
      }
    }
  });
  await Promise.all(pending);
  if (entry.sequence) {
    const next = entries.find(
      (item) => item.sequence === entry.sequence && item.step === entry.step + 1,
    );
    if (next && !links.includes(next.slug))
      problems.push(`${entry.slug}: falta link para a próxima etapa ${next.slug}`);
  }
}
if (problems.length) throw new Error(problems.join('\n'));
console.log(
  `Conteúdo validado: ${entries.length} documentos, ${imageCount} imagens, ${jsonCount} blocos JSON e links entre etapas.`,
);
