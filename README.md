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
npm run content:check  # valida catálogo, imagens, JSON e links entre etapas
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

## Organizar trabalhos e sequências de aprendizagem

O **Trabalho Prático — Arquitetura Orientada a Eventos** está em `src/assets/conteudos/arquitetura-software/trabalho-pratico-eda`, com cinco etapas:

1. `01-iam.md` — usuário IAM e permissões (`/tutoriais/criando-iam`).
2. `02-sns.md` — tópico SNS (`/tutoriais/criando-sns`).
3. `03-sqs.md` — fila SQS (`/tutoriais/criando-sqs`).
4. `04-assinatura.md` — policy da fila, assinatura e mensagem bruta (`/tutoriais/assinando-sqs-sns`).
5. `05-consumer.md` — variáveis de ambiente, consumer e validação SNS → SQS → consumer (`/tutoriais/consumer-sqs`).

O tutorial de DLQ continua como conteúdo complementar, fora das cinco etapas obrigatórias. As imagens continuam em seus caminhos originais em `public/images`. As cinco telas que faltavam foram geradas como exemplos ilustrativos do console AWS e estão documentadas em `public/images/aws-eventos/sns/IMAGENS-EXEMPLO.md`.

Para adicionar outro trabalho ou atividade sequencial, crie seus Markdown na pasta correspondente e acrescente estes campos ao frontmatter de cada etapa:

```yaml
sequence: "identificador-do-trabalho"
sequenceTitle: "Nome da seção do trabalho"
step: 1
```

Use o mesmo `sequence` (um slug único no portal), `sequenceTitle`, `course` e `discipline` em todas as etapas. Numere `step` de 1 até o total de etapas, sem lacunas nem duplicações. `type` pode ser `tutorial` ou `atividade`; `order` continua controlando a ordem geral do catálogo e das seções, enquanto `step` determina a ordem dentro da sequência. Os campos são opcionais para conteúdos independentes.

O catálogo agrupa os conteúdos por sequência, o menu da disciplina cria o acesso direto a cada trabalho e o leitor mostra a etapa atual e os links anterior/próximo a partir desses metadados. O menu e os atalhos da página inicial exibem os trabalhos pelo nome, sem uma aba genérica de Tutoriais; novos trabalhos aparecem junto aos existentes automaticamente. Não é necessário criar um componente ou uma rota por trabalho. Uma seção pode ser acessada por `/tutoriais?sequencia=identificador-do-trabalho`.

Cada etapa deve conter objetivo, pré-requisitos, instruções, verificação de conclusão e link Markdown para o próximo tutorial. O gerador valida os metadados; `npm run content:check` também verifica os links canônicos entre tutoriais, as imagens usadas e a sintaxe dos blocos JSON. Imagens pendentes ficam comentadas até que o arquivo esteja disponível.

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

Tutoriais seguem o formato `/tutoriais/:slug`. O acervo complementar está em `/materiais`. Os endereços antigos `/tutoriais/aws-eda` e `/tutoriais/env-vars` redirecionam, respectivamente, para `criando-iam` e `consumer-sqs`; não existem cópias antigas no catálogo. Os endereços legados em `/materiais/aws-eda`, `/materiais/env-vars`, `/materiais/consumer-sqs` e `/materiais/dlq` também continuam funcionando por redirecionamento.

## Validação

```bash
npm run content:check
npm run build
npm test -- --watch=false
```

O gerador interrompe o processo se encontrar frontmatter obrigatório ausente, `slug` duplicado ou sequência inconsistente. Isso evita publicar links ambíguos, etapas fora de ordem ou conteúdos invisíveis na biblioteca.
