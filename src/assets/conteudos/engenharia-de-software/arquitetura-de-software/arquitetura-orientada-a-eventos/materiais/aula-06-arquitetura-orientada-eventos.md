---
slug: "aula-06-arquitetura-orientada-eventos"
title: "Aula 06 — Arquitetura orientada a eventos"
description: "Apresenta eventos, produtores, barramentos e consumidores, relacionando desacoplamento e idempotência aos trade-offs de consistência eventual, CAP, ACID e BASE."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Aula 06"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/y8kq9eewk98a6ou"
provider: "Canva · Lucas Martins"
tags: ["eda", "eventos", "mensageria", "idempotência", "cap", "acid", "base"]
icon: "fas fa-display"
readingMinutes: 28
updatedAt: "2026-08-09"
order: 115
---

# Aula 06 — Arquitetura orientada a eventos

Em uma arquitetura orientada a eventos, serviços reagem a fatos. Em vez de um componente ordenar que outro execute uma ação imediatamente, ele publica que algo aconteceu: `PedidoCriado`, `PagamentoAprovado` ou `EntregaIniciada`.

## Evento como fato imutável

Um evento registra uma mudança ocorrida no passado. Por isso, seu nome costuma usar o particípio e seu conteúdo deve carregar os dados necessários para compreender o fato.

<figure class="concept-figure">
  <figcaption>Fluxo fundamental da comunicação orientada a eventos.</figcaption>
  <div class="diagram-flow">
    <div class="diagram-node"><strong>Produtor</strong><span>Detecta a mudança</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Barramento</strong><span>Persiste e distribui</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Consumidor</strong><span>Reage no próprio ritmo</span></div>
  </div>
</figure>

## Componentes

### Produtor

Publica um evento válido e não precisa conhecer seus consumidores. Essa ignorância reduz acoplamento: novos consumidores podem surgir sem alterar o produtor.

### Barramento ou broker

Gerencia entrega, persistência e roteamento. Kafka, RabbitMQ, AWS SQS, SNS e EventBridge atendem necessidades diferentes de fila, streaming ou fan-out.

### Consumidor

Escuta eventos e executa uma reação. Precisa ser **idempotente**: processar o mesmo evento mais de uma vez não deve duplicar efeitos indevidos.

## Fan-out

Um único fato pode iniciar vários fluxos independentes.

<figure class="concept-figure">
  <figcaption>Fan-out do evento VendaRealizada para consumidores com responsabilidades diferentes.</figcaption>
  <div class="hub-diagram">
    <div class="hub-center"><strong>Venda realizada</strong><span>Evento</span></div>
    <div class="hub-spokes">
      <div class="diagram-node"><strong>Estoque</strong><span>Reserva itens</span></div>
      <div class="diagram-node"><strong>Fiscal</strong><span>Emite nota</span></div>
      <div class="diagram-node"><strong>Logística</strong><span>Prepara entrega</span></div>
      <div class="diagram-node"><strong>Analytics</strong><span>Atualiza indicadores</span></div>
    </div>
  </div>
</figure>

## Benefícios e desafios

| Benefício | Consequência prática |
|---|---|
| Desacoplamento | Produtor não depende da disponibilidade imediata do consumidor |
| Resiliência | Eventos persistidos podem ser processados após recuperação |
| Escalabilidade | Consumidores podem aumentar sua capacidade separadamente |
| Extensibilidade | Novas reações são adicionadas sem mudar o produtor |

Os desafios também são relevantes: fluxo não linear, debugging distribuído, duplicidade, ordenação, observabilidade e consistência eventual.

## Idempotência

Se um consumidor debita um pagamento duas vezes porque recebeu a mesma mensagem novamente, o sistema falhou. Estratégias comuns incluem:

- armazenar o identificador do evento processado;
- usar uma chave idempotente na operação de destino;
- projetar operações que produzam o mesmo resultado quando repetidas;
- combinar retry com Dead Letter Queue.

<figure class="concept-figure compact-figure">
  <figcaption>Consumidor idempotente reconhece a repetição antes de aplicar o efeito.</figcaption>
  <div class="diagram-flow">
    <div class="diagram-node"><strong>Evento #42</strong><span>Recebido</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node emphasis"><strong>Já processei?</strong><span>Consulta chave idempotente</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Ignorar ou executar</strong><span>Um único efeito</span></div>
  </div>
</figure>

## Consistência imediata e eventual

Na consistência imediata, todos observam o novo estado assim que a operação termina. Isso facilita raciocínio, mas pode exigir bloqueio e coordenação.

Na consistência eventual, diferentes partes podem exibir estados temporariamente distintos, mas convergem depois. Isso favorece disponibilidade e escala, exigindo uma experiência de usuário preparada para defasagens.

<figure class="concept-figure">
  <figcaption>O estado se propaga ao longo do tempo em uma arquitetura eventualmente consistente.</figcaption>
  <div class="timeline-diagram">
    <div><strong>T0</strong><span>Pagamento aprovado</span></div>
    <div><strong>T1</strong><span>Evento publicado</span></div>
    <div><strong>T2</strong><span>Pedido atualizado</span></div>
    <div><strong>T3</strong><span>Interfaces convergem</span></div>
  </div>
</figure>

## Teorema CAP

Durante uma partição de rede, um sistema distribuído precisa escolher entre:

- **Consistência (C):** todos os nós apresentam o mesmo dado, ainda que algumas requisições sejam recusadas;
- **Disponibilidade (A):** toda requisição recebe resposta, ainda que temporariamente com dados divergentes;
- **Tolerância a partição (P):** o sistema continua operando quando nós não conseguem se comunicar.

Como redes falham, P é uma condição prática. A decisão costuma ser como o sistema se comportará entre C e A durante a falha.

## ACID e BASE

### ACID

Atomicidade, Consistência, Isolamento e Durabilidade orientam transações fortes em bancos relacionais. São essenciais quando uma operação precisa ser concluída por inteiro e imediatamente.

### BASE

Basically Available, Soft State e Eventual Consistency favorecem disponibilidade e convergência em sistemas distribuídos de grande escala.

Não existe superioridade universal: pagamento e curtida possuem riscos diferentes. O arquiteto escolhe a garantia compatível com o impacto do negócio.

![Exemplo de uma fila SQS que pode atuar como canal de eventos](/images/aws-eventos/sqs/resumo_sqs.png)

## Verifique seu entendimento

1. Por que o produtor não deve conhecer seus consumidores?
2. Qual efeito uma mensagem duplicada causaria no seu domínio?
3. O usuário consegue compreender que uma atualização ainda está sendo processada?
4. Em uma partição, seu caso prioriza consistência ou disponibilidade?
5. Qual evento representa um fato e não uma ordem?

## Continue praticando

Depois desta revisão, use os tutoriais de SQS, SNS, consumidores e DLQ disponíveis no portal para implementar o fluxo completo e observar retries, duplicidade e tratamento de falhas.
