---
slug: "criando-sns"
title: "Criação do tópico SNS"
description: "Crie o tópico FIFO de pedidos efetuados e guarde seu ARN para a integração."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Trabalho Prático"
type: "tutorial"
sequence: "trabalho-pratico-eda"
sequenceTitle: "Trabalho Prático — Arquitetura Orientada a Eventos"
step: 2
tags: ["aws", "sns", "fifo", "pedidos", "eda"]
icon: "fab fa-aws"
readingMinutes: 8
updatedAt: "2026-10-23"
featured: false
order: 2
---

# Criação do tópico SNS

## Objetivo da etapa

Criar o tópico **SNS FIFO** `pedidos-efetuados.fifo`, onde serão publicados eventos quando um pedido for efetuado. O SNS distribui cada evento para as filas inscritas; neste trabalho teremos uma única fila.

## Pré-requisitos

- Etapa 1 concluída: usuário IAM com acesso ao console e `AmazonSNSFullAccess`.
- Mesma conta AWS do laboratório e região **Norte da Virgínia (`us-east-1`)**.
- Nenhuma fila SQS é necessária neste momento.

## Passo a passo — Criando o tópico FIFO

1. Pesquise por **SNS** no console AWS e abra **Simple Notification Service**.

![Pesquisa pelo serviço SNS no console AWS](/images/aws-eventos/sns/sns_search.png)

2. No menu lateral, acesse **Tópicos** (*Topics*) e clique em **Criar tópico** (*Create topic*).
3. Em **Tipo**, selecione **FIFO**, compatível com a fila FIFO que será criada no próximo tutorial.
4. Em **Nome**, informe `pedidos-efetuados.fifo`. Confira se o sufixo `.fifo` aparece uma única vez.
5. Habilite **Desduplicação de mensagens baseada em conteúdo** (*Content-based message deduplication*). Assim, o SNS pode calcular o ID de desduplicação a partir do corpo quando você não informar um ID explícito na publicação.
6. Mantenha a criptografia opcional do **tópico SNS** desabilitada nesta prática, para não precisar configurar uma chave KMS. Na fila SQS, usaremos criptografia **SSE-SQS**.
7. Em **Política de acesso** (*Access policy*), mantenha a configuração padrão, com publicação e assinatura restritas à conta proprietária do tópico. O usuário IAM dessa conta já recebeu as permissões na etapa 1.
8. Mantenha as demais opções padrão e clique em **Criar tópico**.

![Criação do tópico pedidos-efetuados.fifo com tipo FIFO e desduplicação baseada em conteúdo habilitada](/images/aws-eventos/sns/criar-topico-pedidos-efetuados.png)

*Exemplo ilustrativo do console AWS, gerado para esta atividade. A disposição dos campos pode variar; use os valores descritos no passo a passo.*

> **FIFO:** as mensagens de um mesmo grupo mantêm a ordem de publicação. No teste de envio, você informará um **ID do grupo de mensagens**. Se repetir o mesmo corpo em até cinco minutos com desduplicação por conteúdo e sem um novo ID explícito, a nova entrega poderá ser suprimida.

## Copiando o ARN do tópico

1. Na página do tópico, confirme o nome `pedidos-efetuados.fifo` e o tipo **FIFO**.
2. Em **Detalhes**, copie o **ARN do tópico**. Ele terá um formato semelhante a este:

```text
arn:aws:sns:us-east-1:123456789012:pedidos-efetuados.fifo
```

O número `123456789012` é fictício. Copie o ARN real do console; ele identifica a sua conta e o seu tópico.

![Detalhes do tópico pedidos-efetuados.fifo com seu ARN e nenhuma assinatura](/images/aws-eventos/sns/detalhes-topico-pedidos-efetuados.png)

*Exemplo ilustrativo com a conta fictícia `123456789012`. Copie o ARN real do seu tópico.*

3. Guarde esse ARN nas anotações da atividade. Ele identifica o tópico e será usado na assinatura, depois de criarmos a fila. Nenhuma policy com ARN de fila precisa ser editada agora.

## Como verificar a conclusão

1. Em **SNS → Tópicos**, abra `pedidos-efetuados.fifo` e confira o tipo **FIFO** e a desduplicação baseada em conteúdo habilitada.
2. Confira se o ARN copiado começa com `arn:aws:sns:us-east-1:` e contém o identificador da sua conta.
3. A lista de assinaturas ainda pode estar vazia: a fila não foi criada. Não é necessário publicar uma mensagem nesta etapa.

**Resultado esperado:** tópico criado e ARN anotado. O tipo e o nome do tópico não podem ser alterados depois da criação; confira-os antes de avançar.

Referências: [AWS — criação de tópicos](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html) e [desduplicação FIFO](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html).

## Próxima etapa

Continue em [Etapa 3 — Criação da fila SQS](/tutoriais/criando-sqs).
