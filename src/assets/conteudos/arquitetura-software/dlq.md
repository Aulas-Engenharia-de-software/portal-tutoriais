---
slug: "dlq"
title: "Dead Letter Queue (DLQ) na AWS SQS: diagnóstico e recuperação"
description: "Como criar a DLQ, configurar redrive policy, simular falhas e monitorar mensagens enfileiradas para diagnóstico."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Mensageria"
type: "tutorial"
tags: ["aws", "sqs", "dlq", "mensageria", "resiliencia"]
icon: "fas fa-shield-alt"
readingMinutes: 10
updatedAt: "2026-08-08"
featured: true
order: 4
---

# Entendendo DLQ (Dead Letter Queue)

Uma Dead Letter Queue (DLQ) é uma fila especial para onde o SQS envia mensagens que falharam repetidas vezes no consumidor principal. Isso evita bloqueio da fila e permite diagnóstico e tratamento manual/automático das mensagens problemáticas.

> Regra geral: se uma mensagem atingir o máximo de tentativas de processamento (maxReceiveCount), ela é movida para a DLQ vinculada pela Redrive Policy.

## Arquitetura e Conceitos

- Fila principal (ex.: `T0XN_SEU_NOME_PEDIDOS.fifo`)
- Fila DLQ (ex.: `T0XN_SEU_NOME_PEDIDOS_DLQ.fifo`)
- Redrive Policy: define `deadLetterTargetArn` (ARN da DLQ) e `maxReceiveCount` (tentativas antes de ir para a DLQ)

```json
{
  "deadLetterTargetArn": "arn:aws:sqs:us-east-1:SEU_ACCOUNT_ID:T0XN_SEU_NOME_PEDIDOS_DLQ.fifo",
  "maxReceiveCount": 5
}
```

## Criando a DLQ (Console AWS)

1. Procure por SQS no console da AWS e crie uma nova fila FIFO chamada:

```text
T0XN_SEU_NOME_PEDIDOS_DLQ.fifo
```

- Ative FIFO
- Habilite deduplicação por conteúdo (se desejar)
- Mantenha as demais configs padrão

![Criando a fila DLQ no console da AWS](/images/dlq/create_queue_dlq.png)

## Vinculando a DLQ via Redrive Policy

1. Abra sua fila principal (ex.: `T0XN_SEU_NOME_PEDIDOS.fifo`).
2. Na aba Redrive, clique em Edit.
3. Informe o ARN da DLQ criada e defina `maxReceiveCount` (ex.: 3 a 10, conforme tolerância).

![Configurando Redrive Policy para a fila principal](/images/dlq/edit_main_queue.png)

## Simulando falhas para validar a DLQ

1. No seu consumidor, force uma exceção (apenas para teste) ao receber mensagens.
2. Publique uma mensagem válida na fila principal.
3. Observe no CloudWatch Logs as tentativas de consumo.
4. Após exceder `maxReceiveCount`, verifique a mensagem na DLQ.

Exemplo de log esperado:

```text
Handling messageId=... attempt=5 -> moving to DLQ
```

## Boas Práticas

- Monitore a DLQ com alarmes do CloudWatch (métrica: `ApproximateNumberOfMessagesVisible`).
- Trate DLQ com prioridade: cada item representa falha recorrente no fluxo de negócio.
- Implemente um reprocessador seguro (manual ou automático) para tentar processar mensagens após correções.
- Aplique rastreabilidade (correlationId) nas mensagens para investigação.

## Reprocessando mensagens da DLQ

- Abordagem manual: baixe a mensagem, corrija o payload e reenvie à fila principal.
- Abordagem programática: crie um job que lê da DLQ, aplica uma correção e publica novamente na fila principal.

Exemplo (pseudo-código):

```java
for (Message m : dlqClient.receive()) {
  try {
    var fixed = patch(m.body());
    mainQueueClient.send(fixed);
    dlqClient.delete(m);
  } catch (Exception e) {
    // registra e decide manter na DLQ para análise posterior
  }
}
```

## Checklist de Verificação

- DLQ criada como FIFO? (sufixo `.fifo`)
- Redrive Policy configurada na fila principal? (`deadLetterTargetArn` + `maxReceiveCount`)
- Logs do consumidor comprovam as tentativas e falhas?
- Métricas/alertas configurados na DLQ?
