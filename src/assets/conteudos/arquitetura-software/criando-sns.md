---
slug: "criando-sns"
title: "Criando um SNS para eventos de pedidos efetuados"
description: "Crie um tópico SNS FIFO na sua conta AWS para publicar eventos de pedidos e entregá-los à fila SQS do laboratório."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Integração AWS"
type: "tutorial"
tags: ["aws", "sns", "sqs", "fifo", "pedidos", "event-driven"]
icon: "fab fa-aws"
readingMinutes: 8
updatedAt: "2026-10-22"
featured: false
order: 1
---

# Criando um SNS para eventos de pedidos efetuados

Quando um pedido é efetuado, o sistema publica um evento no **Amazon SNS**. O tópico distribui esse evento às filas inscritas. Nesta prática, criaremos o tópico `pedidos-efetuados.fifo` e depois conectaremos uma única fila SQS para receber os pedidos.

![Evento de pedido publicado no SNS e encaminhado à fila SQS de processamento](/images/aws-eventos/sns/fluxo-pedidos-efetuados.svg)

## Fase 1 — Preparando o acesso

1. Conclua a **Fase 1 — Segurança em primeiro lugar (IAM)** do [Manual de Integração de Eventos na AWS](/tutoriais/aws-eda).
2. A identidade usada no console deve ter `AmazonSNSFullAccess` para criar o tópico, gerenciar assinaturas e publicar eventos. Para a próxima etapa com a fila, também usaremos `AmazonSQSFullAccess`.
3. Se você fez a versão anterior da aula com `AmazonSNSReadOnlyAccess`, peça ao administrador da conta para substituí-la por `AmazonSNSFullAccess`. Somente leitura não permite criar o tópico nem publicar eventos.
4. Selecione **Norte da Virgínia (`us-east-1`)** no console. Crie o tópico e a fila **na mesma conta e região**.

> **Escopo da prática:** as policies gerenciadas acima simplificam a configuração do laboratório. Em produção, use permissões limitadas às ações e aos recursos necessários para cada aplicação.

## Fase 2 — Criando o tópico SNS FIFO

1. Pesquise por **SNS** no console AWS e abra **Simple Notification Service**.

![Pesquisa pelo serviço SNS no console AWS](/images/aws-eventos/sns/sns_search.png)

2. No menu lateral, acesse **Tópicos** (*Topics*) e clique em **Criar tópico** (*Create topic*).
3. Em **Tipo**, selecione **FIFO**, compatível com a fila FIFO que será criada no próximo tutorial.
4. Em **Nome**, informe `pedidos-efetuados.fifo`. Confira se o sufixo `.fifo` aparece uma única vez.
5. Habilite **Desduplicação de mensagens baseada em conteúdo** (*Content-based message deduplication*). Assim, o SNS pode calcular o ID de desduplicação a partir do corpo quando você não informar um ID explícito na publicação.
6. Mantenha a criptografia opcional do **tópico SNS** desabilitada nesta prática, para não precisar configurar uma chave KMS. Na fila SQS, usaremos criptografia **SSE-SQS**.
7. Em **Política de acesso** (*Access policy*), mantenha a configuração padrão, com publicação e assinatura restritas à conta proprietária do tópico. O usuário IAM dessa conta precisa das permissões da Fase 1.
8. Mantenha as demais opções padrão e clique em **Criar tópico**.

<!-- CAPTURA PENDENTE: salvar em public/images/aws-eventos/sns/criar-topico-pedidos-efetuados.png e descomentar a imagem abaixo.
![Criação do tópico pedidos-efetuados.fifo com tipo FIFO e desduplicação baseada em conteúdo habilitada](/images/aws-eventos/sns/criar-topico-pedidos-efetuados.png)
-->

> **FIFO:** as mensagens de um mesmo grupo mantêm a ordem de publicação. No teste de envio, você informará um **ID do grupo de mensagens**. Se repetir o mesmo corpo em até cinco minutos com desduplicação por conteúdo e sem um novo ID explícito, a nova entrega poderá ser suprimida.

## Fase 3 — Copiando o ARN e preparando a integração

1. Na página do tópico, confirme o nome `pedidos-efetuados.fifo` e o tipo **FIFO**.
2. Em **Detalhes**, copie o **ARN do tópico**. Ele terá um formato semelhante a este:

```text
arn:aws:sns:us-east-1:123456789012:pedidos-efetuados.fifo
```

O número `123456789012` é fictício. Copie o ARN real do console; ele identifica a sua conta e o seu tópico.

<!-- CAPTURA PENDENTE: salvar em public/images/aws-eventos/sns/detalhes-topico-pedidos-efetuados.png e descomentar a imagem abaixo.
![Detalhes do tópico pedidos-efetuados.fifo com o ARN destacado](/images/aws-eventos/sns/detalhes-topico-pedidos-efetuados.png)
-->

3. Guarde esse ARN para preencher `aws:SourceArn` na policy da fila SQS. Essa autorização permitirá que **este tópico** entregue mensagens à fila.

| Permissão | Onde configurar | Função no fluxo |
| --- | --- | --- |
| `AmazonSNSFullAccess` e `AmazonSQSFullAccess` | Identidade IAM do laboratório | Criar e configurar os recursos, publicar e conferir as mensagens |
| Acesso padrão do tópico à própria conta | Política de acesso do SNS | Manter publicação e assinatura dentro da conta do laboratório |
| `sqs:SendMessage` para `sns.amazonaws.com`, limitado por `aws:SourceArn` | Política de acesso da fila SQS | Autorizar a entrega de mensagens deste tópico à fila |

**Próximo passo:** volte à **Fase 2 — Criando a fila SQS** do [Manual de Integração de Eventos na AWS](/tutoriais/aws-eda). Lá você criará `pedidos-efetuados-processamento.fifo`, aplicará a policy, criará a assinatura dentro deste SNS e testará a publicação de um pedido. A assinatura ficará sem filtros nesta prática.

## Referências

- [AWS: criação de tópicos SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html).
- [AWS: policy AmazonSNSFullAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonSNSFullAccess.html).
- [AWS: desduplicação em tópicos FIFO](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html).
