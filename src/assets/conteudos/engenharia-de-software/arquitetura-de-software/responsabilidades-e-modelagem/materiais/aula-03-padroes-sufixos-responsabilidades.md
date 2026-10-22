---
slug: "aula-03-padroes-sufixos-responsabilidades"
title: "Aula 03 — Padrões, sufixos e responsabilidades"
description: "Organiza o papel de Controllers, DTOs, Services, objetos de negócio, Repositories e Entities, além de discutir modelos anêmicos, modelos ricos e o custo do overengineering."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Responsabilidades e Modelagem"
category: "Aula 03"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/heywniwdsem49eg"
provider: "Canva · Lucas Martins"
tags: ["srp", "dto", "service", "repository", "modelo rico", "modelo anêmico"]
icon: "fas fa-display"
readingMinutes: 24
updatedAt: "2026-08-09"
order: 112
---

# Aula 03 — Padrões, sufixos e responsabilidades

Sufixos como `Controller`, `Service`, `DTO` e `Repository` não são exigências da linguagem. Eles formam uma **linguagem arquitetural compartilhada**: ao ler o nome de uma classe, a equipe deve compreender seu papel e seus limites.

## Responsabilidade única como guia

O Princípio da Responsabilidade Única não significa “uma classe com um único método”. Significa que cada componente deve possuir **um motivo coerente para mudar**.

<figure class="concept-figure">
  <figcaption>Fluxo de responsabilidades em uma aplicação corporativa.</figcaption>
  <div class="diagram-flow wrap-flow">
    <div class="diagram-node"><strong>Controller</strong><span>Entrada e resposta</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>DTO</strong><span>Contrato de dados</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Service + Domínio</strong><span>Orquestração e regras</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Repository</strong><span>Persistência</span></div>
  </div>
</figure>

## Modelo anêmico e modelo rico

### Modelo anêmico

Um modelo anêmico contém dados, getters e setters, mas quase nenhum comportamento. As regras acabam concentradas em Services ou Controllers.

**Riscos:** duplicação de lógica, entidades em estados inválidos, Services gigantes e baixo encapsulamento.

### Modelo rico

Um modelo rico protege seu estado e expressa intenções por métodos. Em vez de `setPreco(-10)`, o objeto pode oferecer `aplicarDesconto()` e validar suas invariantes.

<figure class="concept-figure">
  <figcaption>Comparação entre objeto passivo e objeto que protege o próprio estado.</figcaption>
  <div class="diagram-compare">
    <div class="compare-panel danger"><strong>Modelo anêmico</strong><span>Dados são alterados por agentes externos.</span><small>Regras espalhadas e estado vulnerável</small></div>
    <div class="compare-divider">×</div>
    <div class="compare-panel success"><strong>Modelo rico</strong><span>O objeto valida operações e preserva invariantes.</span><small>Comportamento próximo ao domínio</small></div>
  </div>
</figure>

Modelo rico não é uma obrigação para todos os cadastros. Aplicá-lo a dados triviais pode aumentar a complexidade sem retorno. O princípio KISS continua válido: use o nível de modelagem que o problema justifica.

## Controller ou Handler

**Deve:**

- receber e desserializar a requisição;
- realizar validações de formato;
- delegar o caso de uso;
- retornar status, cabeçalhos e resposta.

**Não deve:** conter cálculo de domínio, acessar banco diretamente ou decidir políticas de negócio.

## DTO

O Data Transfer Object define o contrato de entrada ou saída. Ele protege detalhes internos, reduz dados transportados e pode agregar informações para um consumidor.

**Não deve:** possuir regra de negócio ou mapeamento de persistência.

## Service

O Service representa um caso de uso ou a camada de aplicação. Ele coordena Repositories, objetos de domínio e integrações, além de definir limites transacionais.

Um Service vira uma *God Class* quando absorve todas as regras. Sempre pergunte se determinado comportamento pertence ao próprio objeto de domínio.

## Business Object ou objeto de domínio

É onde vivem regras fundamentais e invariantes:

- cálculos e políticas;
- validação de estados possíveis;
- operações que expressam intenção;
- comportamento independente de frameworks.

## Repository e DAO

Esses componentes abstraem persistência e consultas. Eles permitem que a aplicação solicite “buscar pedido” ou “salvar cliente” sem conhecer detalhes de SQL, NoSQL ou ORM.

**Não devem:** decidir se um usuário é VIP ou qual política comercial aplicar. O Repository executa uma estratégia de acesso; não define a regra que escolhe a estratégia.

## Entity de persistência

A Entity representa como os dados são armazenados e mapeados pelo ORM. Em projetos simples, ela pode também representar o domínio. Em domínios complexos, separar Entity e objeto de domínio reduz o acoplamento com a tecnologia de banco.

<figure class="concept-figure">
  <figcaption>Mapa de limites: detalhes externos não devem dominar as regras centrais.</figcaption>
  <div class="diagram-stack inverted-stack">
    <div class="diagram-node"><strong>HTTP / Interface</strong><span>Controller e DTO</span></div>
    <div class="diagram-node emphasis"><strong>Aplicação e domínio</strong><span>Service, casos de uso e objetos de negócio</span></div>
    <div class="diagram-node"><strong>Infraestrutura</strong><span>Repository, Entity, ORM e banco</span></div>
  </div>
</figure>

## Checklist para revisão de código

- A Controller conhece detalhes de banco?
- O DTO contém comportamento de negócio?
- O Service concentra regras que pertencem a um objeto?
- A Entity pode ser colocada em estado inválido por setters públicos?
- O Repository toma decisões comerciais?
- O nome da classe comunica claramente sua responsabilidade?

## Verifique seu entendimento

1. Por que um modelo rico pode facilitar testes unitários?
2. Quando um modelo anêmico simples pode ser suficiente?
3. Qual é a diferença entre orquestrar uma regra e executar a regra?
4. Por que retornar uma Entity diretamente na API aumenta acoplamento?

## Próximo passo

Com responsabilidades mais claras, a próxima aula mostra como proteger o núcleo do sistema por meio de Clean Architecture, Onion e Arquitetura Hexagonal.
