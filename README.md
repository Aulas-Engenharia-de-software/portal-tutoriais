# Portal de Aulas

Portal autoral do professor Lucas Martins para organizar cursos, disciplinas, tutoriais, atividades e materiais acadêmicos. O acervo atual pertence ao curso de Engenharia de Software, na disciplina de Arquitetura de Software e no módulo de Arquitetura Orientada a Eventos.

O conteúdo é escrito em Markdown. A aplicação Angular gera automaticamente o catálogo, renderiza cada arquivo com o mesmo design e cria o sumário lateral a partir dos títulos.

## Executar o projeto

Requisitos: Node.js 20+ e npm 10+.

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

Comandos principais:

```bash
npm run content:index  # atualiza o catálogo a partir dos arquivos .md
npm run build          # gera o catálogo e o build de produção
npm test -- --watch=false
```

`npm start`, `npm run build` e `npm test` atualizam o catálogo automaticamente.

## Adicionar um conteúdo

1. Crie uma pasta para a disciplina dentro de `src/assets/conteudos` caso ela ainda não exista.
2. Adicione um arquivo `.md` nessa pasta.
3. Preencha o frontmatter obrigatório e escreva o conteúdo.
4. Execute `npm start`. O novo item aparecerá automaticamente na biblioteca.

Exemplo:

```markdown
---
slug: "rag-com-pgvector"
title: "Construindo um RAG com pgvector"
description: "Do carregamento dos documentos até a recuperação semântica."
course: "Inteligência Artificial Aplicada"
discipline: "Projetos com LLMs"
module: "Retrieval-Augmented Generation"
category: "RAG"
type: "tutorial"
tags: ["llm", "rag", "embeddings", "postgres"]
icon: "fas fa-robot"
readingMinutes: 20
updatedAt: "2026-08-08"
featured: false
order: 10
---

# Construindo um RAG com pgvector

Introdução do tutorial.

## Preparando o banco

Conteúdo da primeira seção.

### Criando a extensão

Detalhes opcionais de uma subseção.
```

Campos aceitos:

- `slug`, `title`, `description`, `course`, `discipline`, `module`, `category` e `type` são obrigatórios;
- `type` pode ser `tutorial`, `atividade` ou `material`;
- `tags`, `icon`, `readingMinutes`, `updatedAt`, `featured` e `order` são opcionais;
- títulos `##` e `###` alimentam o sumário interativo;
- imagens devem ficar em `public/images` e ser referenciadas como `![Descrição](/images/caminho.png)`;
- blocos cercados por três crases recebem o visual de código e o botão de cópia automaticamente.

## Adicionar materiais da disciplina

Materiais também são arquivos Markdown, mas utilizam `type: "material"` e informam o formato com `resourceType`.

```markdown
---
slug: "slides-introducao-eda"
title: "Introdução à Arquitetura Orientada a Eventos"
description: "Slides utilizados na primeira aula do módulo."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Aula 01"
type: "material"
resourceType: "slides"
externalUrl: "/materiais/engenharia-software/slides-aula-01.pdf"
provider: "Prof. Lucas Martins"
tags: ["eda", "slides"]
icon: "fas fa-display"
order: 100
---

# Introdução à Arquitetura Orientada a Eventos
```

Valores aceitos em `resourceType`: `slides`, `site`, `pdf`, `livro` e `repositorio`. O campo `externalUrl` pode apontar para um arquivo em `public`, um site ou um repositório externo.

## Arquitetura

```text
src/assets/conteudos/                 arquivos Markdown por disciplina
scripts/generate-content-index.mjs   valida frontmatter e gera o catálogo
src/app/core/content/                 tipos, índice gerado e carregamento
src/app/features/tutorials/
  tutorials-list/                    busca e filtros da biblioteca
  tutorial-reader/                   renderização, sumário, zoom e cópia
src/app/features/materials/          acervo de slides, sites, PDFs, livros e repositórios
```

Tutoriais seguem o formato `/tutoriais/:slug`. O acervo complementar está em `/materiais`; os endereços antigos dos quatro tutoriais em `/materiais/:slug` continuam funcionando por redirecionamento.

## Validação

```bash
npm run build
npm test -- --watch=false
```

O gerador interrompe o processo se encontrar frontmatter obrigatório ausente ou `slug` duplicado. Isso evita publicar links ambíguos ou conteúdos invisíveis na biblioteca.
