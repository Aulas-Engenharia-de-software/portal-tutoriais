---
slug: "aula-05-microsservicos"
title: "Aula 05 — Microsserviços"
description: "Explica a evolução do monólito para sistemas distribuídos, abordando autonomia, limites de domínio, conectores, resiliência, escalabilidade e os custos dessa divisão."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Microsserviços"
category: "Aula 05"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/2erdpn16el1l8j4"
provider: "Canva · Lucas Martins"
tags: ["microsserviços", "monólito", "sistemas distribuídos", "resiliência", "escalabilidade"]
icon: "fas fa-display"
readingMinutes: 21
updatedAt: "2026-08-09"
order: 114
---

# Aula 05 — Microsserviços

Microsserviços ampliam a separação de responsabilidades para processos e implantações independentes. O objetivo não é produzir serviços pequenos: é criar **limites de domínio autônomos** que possam evoluir e operar de maneira coordenada.

## Ponto de partida: o monólito

Um monólito reúne módulos em uma unidade de implantação. Isso pode ser simples, rápido e correto durante grande parte da vida de um produto.

<figure class="concept-figure compact-figure">
  <figcaption>Monólito modular: diferentes capacidades compartilham processo e implantação.</figcaption>
  <div class="monolith-diagram">
    <strong>Aplicação</strong>
    <div class="diagram-grid three-items">
      <div class="diagram-node"><strong>Catálogo</strong><span>Módulo</span></div>
      <div class="diagram-node"><strong>Pagamento</strong><span>Módulo</span></div>
      <div class="diagram-node"><strong>Notificação</strong><span>Módulo</span></div>
    </div>
    <small>Um build · um deploy · recursos compartilhados</small>
  </div>
</figure>

Problemas aparecem quando a unidade cresce sem limites claros:

- uma alteração pequena exige publicar todo o sistema;
- módulos passam a conhecer detalhes uns dos outros;
- escalar uma função significa escalar o conjunto inteiro;
- falhas e consumo de recursos se propagam.

## Definindo microsserviços

Um microsserviço é um serviço autônomo, alinhado a uma capacidade de negócio, executado em processo próprio e integrado por mecanismos leves como HTTP ou mensageria.

<figure class="concept-figure">
  <figcaption>Em microsserviços, cada capacidade possui implantação e dados sob sua responsabilidade.</figcaption>
  <div class="service-map">
    <div class="service-card"><strong>Catálogo</strong><span>API + dados próprios</span></div>
    <div class="service-connector">API / eventos</div>
    <div class="service-card emphasis"><strong>Pedidos</strong><span>API + dados próprios</span></div>
    <div class="service-connector">API / eventos</div>
    <div class="service-card"><strong>Pagamento</strong><span>API + dados próprios</span></div>
    <div class="service-connector">eventos</div>
    <div class="service-card"><strong>Notificação</strong><span>API + dados próprios</span></div>
  </div>
</figure>

## Pilares

### Contexto de domínio

O serviço conhece uma capacidade específica. Estoque trata estoque; pagamento trata pagamento. O limite deve refletir linguagem e regras do negócio, não apenas tabelas.

### Autonomia

Equipe, código, deploy e dados precisam de autonomia suficiente para que uma mudança local não exija coordenação global constante.

### Resiliência

Chamadas de rede falham. Serviços precisam de timeout, retry consciente, circuit breaker, idempotência e fluxos de recuperação.

### Observabilidade

Logs, métricas e rastreamento distribuído são essenciais porque uma operação atravessa diferentes processos.

## Componentes, conectores e configuração

- **Componentes:** serviços, bancos, servidores e APIs externas.
- **Conectores:** REST, gRPC, mensageria e WebSocket.
- **Configuração:** forma como os componentes são distribuídos e conectados.

Cada serviço pode possuir arquitetura interna diferente, desde que seus contratos e responsabilidades sejam claros.

## O custo da distribuição

<figure class="concept-figure">
  <figcaption>O ganho de autonomia troca problemas locais por desafios de coordenação distribuída.</figcaption>
  <div class="diagram-compare">
    <div class="compare-panel success"><strong>Ganhos</strong><span>Deploy e escala independentes, isolamento de falhas e times autônomos.</span><small>Mais flexibilidade organizacional</small></div>
    <div class="compare-divider">⇄</div>
    <div class="compare-panel danger"><strong>Custos</strong><span>Rede, consistência, observabilidade, testes e operação mais complexos.</span><small>Mais coordenação técnica</small></div>
  </div>
</figure>

O sistema passa a lidar com latência, indisponibilidade parcial, duplicação de mensagens e transações que não cabem em um único banco.

## Cenário CineCloud

Uma rede de cinemas cai durante pré-vendas, o banco trava e confirmações demoram. A resposta não deve ser “usar microsserviços” automaticamente. Primeiro, decomponha necessidades:

1. catálogo precisa suportar muitas leituras;
2. reserva precisa controlar concorrência;
3. pagamento exige consistência e recuperação;
4. confirmação pode ser assíncrona;
5. cargas variam conforme lançamentos.

<figure class="concept-figure">
  <figcaption>Possível decomposição do cenário, sem assumir que toda comunicação precisa ser síncrona.</figcaption>
  <div class="diagram-flow wrap-flow">
    <div class="diagram-node"><strong>Cliente</strong><span>Consulta sessões</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Reservas</strong><span>Controla assentos</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Pagamento</strong><span>Confirma transação</span></div>
    <span class="diagram-arrow">⇢</span>
    <div class="diagram-node"><strong>Notificação</strong><span>Reage ao evento</span></div>
  </div>
</figure>

## Quando não usar

Evite começar com microsserviços quando o domínio ainda é desconhecido, a equipe é pequena, o volume não justifica distribuição ou a organização não possui automação e observabilidade maduras. Um monólito modular pode preservar limites com custo menor.

## Verifique seu entendimento

1. Um microsserviço é definido pela quantidade de linhas? **Não.** O limite de domínio é mais importante.
2. Banco compartilhado preserva autonomia? Geralmente não, porque mudanças de esquema coordenam vários serviços.
3. Qual falha de rede seu fluxo precisa suportar?
4. Quais partes realmente precisam escalar separadamente?

## Próximo passo

A próxima aula explora comunicação assíncrona e arquitetura orientada a eventos, uma abordagem importante para reduzir acoplamento temporal entre serviços.
