---
slug: "dlq"
title: "Dead Letter Queue (DLQ) na AWS SQS: diagnóstico e recuperação"
description: "Como criar a DLQ, configurar a Redrive Policy e reenviar mensagens após corrigir a causa da falha."
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

# Configuração de Dead Letter Queue (DLQ)

Na arquitetura orientada a eventos, nem toda mensagem pode ser processada com sucesso de primeira. Falhas no banco de dados, APIs fora do ar ou payloads mal formatados podem gerar erros contínuos.

> **O que é uma DLQ?** A *Dead Letter Queue* (fila de mensagens mortas) é uma fila de segurança. Quando sua aplicação falha ao processar uma mensagem repetidas vezes, o SQS a encaminha para a DLQ. Isso permite analisar o erro sem continuar tentando processar a mensagem na fila principal.

## Fase 1 — Criando a fila DLQ

Crie uma fila separada para receber as mensagens com falha. Ela deve ser do **mesmo tipo** da fila principal.

1. Acesse o console do **SQS** e clique em **Criar fila** (*Create queue*).

![Tela de criação de fila SQS](/images/dlq/create_queue_dlq.png)

2. Se a fila principal é FIFO, a DLQ **também deve ser FIFO**. Selecione o mesmo tipo.

![Selecionando o tipo da fila como FIFO](/images/dlq/create_fifo_name_dlq.png)

3. Use o sufixo `-DLQ` para facilitar a identificação. Se a fila principal é `pedidos-efetuados-processamento.fifo`, chame a DLQ de `pedidos-efetuados-processamento-DLQ.fifo`.
4. Desça até o final da página e salve a fila.
5. Na tela de resumo da nova DLQ, copie o **ARN**. Ele será usado na próxima fase.

![Copiando o ARN da DLQ recém-criada](/images/dlq/copy_arn_dlq.png)

## Fase 2 — Configurando a Redrive Policy

Configure a fila **principal** para encaminhar à DLQ as mensagens que excederem o limite de recebimentos.

1. Volte à listagem de filas e clique na **fila principal**, que recebe os eventos do SNS.
2. No canto superior direito, clique em **Editar** (*Edit*).

![Editando a fila SQS principal](/images/dlq/edit_main_queue.png)

3. Role a página até a seção **Fila de mensagens mortas** (*Dead-letter queue*).
4. Marque **Habilitado** e cole o ARN da DLQ copiado na fase anterior.
5. No campo **Recebimentos máximos** (*Maximum receives*), digite `3`.

![Configuração da Dead-letter queue](/images/dlq/dlq_config_in_sqs.png)

> **O que significa o número 3?** É o limite de recebimentos configurado para esta prática. Mensagens que continuarem falhando serão encaminhadas à DLQ conforme a política de redrive.

6. Desça até o final da página e clique em **Salvar**.

## Fase 3 — DLQ Redrive: reenviando mensagens

Imagine que o banco de dados ficou fora do ar e 50 mensagens foram parar na DLQ. Depois de corrigir o problema, use o **DLQ Redrive** para processá-las novamente.

1. Acesse sua fila **DLQ**.
2. No canto superior direito, clique em **Iniciar DLQ redrive**.

![Botão de iniciar redrive na DLQ](/images/dlq/start_redrive_dlq.png)

3. Mantenha a opção de enviar as mensagens de volta para a **fila de origem**.
4. Confirme a operação. As mensagens voltarão à fila principal e poderão ser processadas novamente, agora que a causa da falha foi corrigida.
