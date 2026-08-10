---
slug: "aula-02-padroes-arquitetura"
title: "Aula 02 — Padrões de arquitetura"
description: "Compara Layered, MVC, MVVM e CQRS, destacando estrutura, aplicações, benefícios, limitações e os trade-offs que orientam a escolha de cada padrão."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Padrões Arquiteturais"
category: "Aula 02"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/49wvf3j4c07ecji"
provider: "Canva · Lucas Martins"
tags: ["layered", "mvc", "mvvm", "cqrs", "trade-offs"]
icon: "fas fa-display"
readingMinutes: 22
updatedAt: "2026-08-09"
order: 111
---

# Aula 02 — Padrões de arquitetura

Padrões arquiteturais organizam a estrutura macro de um sistema. Eles são diferentes de padrões de projeto, que normalmente resolvem problemas mais localizados no código.

> Um padrão não é uma receita obrigatória. Ele é um vocabulário compartilhado para explicar uma organização, seus benefícios e seus custos.

## Critérios para escolher um padrão

Antes de escolher, pergunte:

- qual latência e throughput são aceitáveis;
- quão fácil deve ser compreender e manter o fluxo;
- quais partes precisam evoluir ou escalar de forma independente;
- como será realizado o deploy;
- qual complexidade a equipe consegue sustentar.

<figure class="concept-figure">
  <figcaption>Uma decisão arquitetural equilibra forças que competem entre si.</figcaption>
  <div class="diagram-grid four-items">
    <div class="diagram-node"><strong>Performance</strong><span>Latência e volume</span></div>
    <div class="diagram-node"><strong>Agilidade</strong><span>Velocidade para mudar</span></div>
    <div class="diagram-node"><strong>Custo cognitivo</strong><span>Facilidade de compreensão</span></div>
    <div class="diagram-node"><strong>Deploy</strong><span>Independência operacional</span></div>
  </div>
</figure>

## Layered Architecture

A arquitetura em camadas separa responsabilidades horizontalmente. Uma divisão recorrente contém apresentação, negócio, persistência e banco de dados.

<figure class="concept-figure">
  <figcaption>Esquema de camadas fechadas: cada camada conhece apenas a imediatamente inferior.</figcaption>
  <div class="diagram-stack">
    <div class="diagram-node"><strong>Presentation</strong><span>Interfaces, Controllers e contratos HTTP</span></div>
    <div class="diagram-node emphasis"><strong>Business</strong><span>Casos de uso e regras de negócio</span></div>
    <div class="diagram-node"><strong>Persistence</strong><span>Repositories e acesso a dados</span></div>
    <div class="diagram-node"><strong>Database</strong><span>Armazenamento físico</span></div>
  </div>
</figure>

**Benefícios:** separação clara, curva de aprendizado pequena e boa adequação a sistemas corporativos tradicionais.

**Riscos:** excesso de repasses, acoplamento vertical e surgimento do *sinkhole anti-pattern*, quando camadas apenas encaminham dados sem acrescentar comportamento.

## MVC

O Model-View-Controller separa entrada, lógica e apresentação:

- **Controller:** recebe a entrada, valida o formato e decide qual ação executar;
- **Model:** representa dados e regras de negócio;
- **View:** apresenta a resposta, seja uma tela, HTML ou JSON.

<figure class="concept-figure compact-figure">
  <figcaption>Fluxo simplificado do MVC.</figcaption>
  <div class="diagram-flow">
    <div class="diagram-node"><strong>Usuário</strong><span>Envia uma ação</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Controller</strong><span>Orquestra a entrada</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Model</strong><span>Aplica regras</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>View</strong><span>Apresenta o resultado</span></div>
  </div>
</figure>

O principal alerta é a **Controller obesa**: quando regras de negócio vazam para a entrada, testes ficam difíceis e as responsabilidades se confundem.

## MVVM

O Model-View-ViewModel é comum em interfaces reativas:

- a **View** exibe dados e captura eventos;
- o **Model** mantém regras e dados;
- a **ViewModel** transforma o Model em estado consumível pela View.

O *data binding* reduz código manual de sincronização, mas pode tornar o fluxo difícil de rastrear e gerar ciclos de atualização quando mal utilizado.

## CQRS

Command Query Responsibility Segregation separa os caminhos de escrita e leitura.

<figure class="concept-figure">
  <figcaption>CQRS permite otimizar cada lado com modelos e escalas diferentes.</figcaption>
  <div class="diagram-compare">
    <div class="compare-panel warm"><strong>Command side</strong><span>Valida intenção, altera estado e preserva regras transacionais.</span><small>Foco: consistência de escrita</small></div>
    <div class="compare-divider">⇄</div>
    <div class="compare-panel cool"><strong>Query side</strong><span>Usa projeções e modelos prontos para consulta.</span><small>Foco: velocidade de leitura</small></div>
  </div>
</figure>

O ganho de escala vem acompanhado de **consistência eventual**: o dado escrito pode levar algum tempo para aparecer no modelo de leitura.

## Comparação rápida

| Padrão | Melhor encaixe | Principal risco |
|---|---|---|
| Layered | Sistemas corporativos com fluxo previsível | Camadas sem comportamento |
| MVC | APIs e aplicações com entrada e apresentação claras | Controllers obesas |
| MVVM | Interfaces ricas e reativas | Fluxo de estado difícil de rastrear |
| CQRS | Leituras e escritas com necessidades muito diferentes | Complexidade e consistência eventual |

## Cenário de decisão

Uma plataforma de streaming precisa exibir o catálogo com latência muito baixa, enquanto o cadastro e processamento de novos títulos pode ser assíncrono. **CQRS** é um candidato forte porque permite escalar e otimizar leitura e escrita separadamente.

Isso não torna CQRS automaticamente correto. A decisão depende do volume, da tolerância à defasagem e da capacidade operacional da equipe.

## Verifique seu entendimento

1. Por que usar cinco camadas em um CRUD simples pode ser desperdício?
2. Qual problema o CQRS resolve que o MVC não pretende resolver?
3. Em que situação o data binding do MVVM se transforma em risco?
4. Qual padrão sua equipe consegue operar sem aumentar o tempo de entrega?

## Próximo passo

A próxima aula aproxima os padrões do código, definindo responsabilidades para Controllers, DTOs, Services, objetos de negócio, Repositories e Entities.
