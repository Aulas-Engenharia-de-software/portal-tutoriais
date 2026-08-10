---
slug: "aula-01-introducao-metodologias"
title: "Aula 01 — Introdução e metodologias"
description: "Apresenta a disciplina, a metodologia de avaliação, o papel da arquitetura de software e as responsabilidades do arquiteto na conexão entre tecnologia e negócio."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Introdução à Arquitetura"
category: "Aula 01"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/knz2w9yzbbr1vsv"
provider: "Canva · Lucas Martins"
tags: ["introdução", "metodologia", "arquiteto de software", "fundamentos"]
icon: "fas fa-display"
readingMinutes: 16
updatedAt: "2026-08-09"
order: 110
---

# Aula 01 — Introdução e metodologias

Esta aula apresenta o contrato da disciplina e responde à pergunta que orienta todo o curso: **por que decisões de arquitetura importam antes, durante e depois da implementação?**

> Use esta página como roteiro de revisão. A apresentação original continua disponível no botão “Abrir material original” no topo.

## O que você deve compreender

Ao final deste conteúdo, você deve conseguir:

- diferenciar arquitetura de software de uma simples escolha de tecnologia;
- relacionar decisões técnicas a objetivos e restrições do negócio;
- reconhecer as responsabilidades de um arquiteto de software;
- entender como atividades, comunicação e avaliação serão conduzidas na disciplina.

## O que é arquitetura de software

Arquitetura de software é a **estrutura de um sistema e o conjunto de decisões que orienta sua evolução**. Ela define componentes, responsabilidades, integrações e restrições importantes. Não é apenas um diagrama: é uma forma de manter tecnologia, pessoas e negócio olhando para a mesma direção.

<figure class="concept-figure">
  <figcaption>Imagem conceitual — a arquitetura conecta necessidades de negócio à solução construída.</figcaption>
  <div class="diagram-flow">
    <div class="diagram-node"><strong>Necessidade</strong><span>Problema, usuário e objetivo de negócio</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Decisões arquiteturais</strong><span>Estrutura, limites, tecnologias e qualidade</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Sistema</strong><span>Software operável, evolutivo e sustentável</span></div>
  </div>
</figure>

Uma arquitetura adequada ajuda a reduzir riscos, melhorar a comunicação e preservar opções. Isso significa permitir que o sistema evolua sem exigir uma reconstrução completa a cada mudança.

## Por que estudar arquitetura

### Redução de riscos

Decisões estruturais tomadas cedo ajudam a identificar gargalos de desempenho, segurança, integração ou manutenção antes que se tornem caros.

### Comunicação

Modelos e padrões criam uma linguagem comum. Quando a equipe diz “MVC”, “CQRS” ou “arquitetura orientada a eventos”, o termo deve resumir responsabilidades e consequências conhecidas.

### Evolução e qualidade

Uma boa arquitetura não elimina mudanças. Ela torna a mudança **previsível**, mantendo o sistema testável, observável e adaptável.

<figure class="concept-figure compact-figure">
  <figcaption>Quatro resultados esperados de uma decisão arquitetural consciente.</figcaption>
  <div class="diagram-grid four-items">
    <div class="diagram-node"><strong>Manutenção</strong><span>Alterações localizadas</span></div>
    <div class="diagram-node"><strong>Escala</strong><span>Crescimento com intenção</span></div>
    <div class="diagram-node"><strong>Confiabilidade</strong><span>Falhas previstas e tratadas</span></div>
    <div class="diagram-node"><strong>Comunicação</strong><span>Decisões compreensíveis</span></div>
  </div>
</figure>

## O papel do arquiteto

O arquiteto não é apenas a pessoa que escolhe ferramentas. Sua função envolve:

1. **Definir uma visão técnica** alinhada aos objetivos do produto.
2. **Avaliar trade-offs** entre desempenho, custo, segurança, prazo e complexidade.
3. **Selecionar tecnologias** com critérios explícitos, evitando decisões por moda.
4. **Comunicar decisões** para equipes técnicas e stakeholders de negócio.
5. **Acompanhar a evolução** e revisar hipóteses quando o contexto muda.

> Arquitetura não é a busca por uma solução perfeita. É a escolha consciente da solução mais adequada para o contexto atual, preservando espaço para mudanças futuras.

## Como a disciplina será desenvolvida

O curso combina conceitos, discussão e trabalhos práticos. Os conteúdos avançam de padrões clássicos para arquiteturas distribuídas:

<figure class="concept-figure">
  <figcaption>Trilha de aprendizagem da disciplina.</figcaption>
  <div class="diagram-flow wrap-flow">
    <div class="diagram-node"><strong>Fundamentos</strong><span>Decisões e qualidade</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Padrões</strong><span>Layered, MVC, MVVM e CQRS</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Clean</strong><span>Domínio, portas e adaptadores</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Distribuídos</strong><span>Microsserviços e eventos</span></div>
  </div>
</figure>

As atividades e critérios de avaliação são comunicados pelos canais oficiais da disciplina. A prática inclui análise de cenários, desenho de soluções e implementação de conceitos em código e serviços de nuvem.

## Atividade de revisão

Escolha uma disciplina já cursada, como Banco de Dados, Programação Orientada a Objetos ou Gestão de Projetos, e responda:

- qual é o conceito central dessa disciplina;
- onde esse conhecimento aparece em um ambiente corporativo;
- como ele influencia uma decisão de arquitetura;
- qual parte você ainda precisa revisar.

## Verifique seu entendimento

- Arquitetura de software é apenas a seleção de frameworks? **Não.** Ela inclui estrutura, responsabilidades, comunicação e atributos de qualidade.
- Toda decisão arquitetural é permanente? **Não.** Mas algumas são caras de reverter e precisam de mais evidências.
- O arquiteto trabalha isolado? **Não.** Comunicação e alinhamento fazem parte central do papel.

## Próximo passo

Na próxima aula, esses fundamentos serão aplicados à escolha de **padrões arquiteturais**, comparando soluções e seus trade-offs.
