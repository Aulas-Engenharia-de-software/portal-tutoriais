---
slug: "criando-sqs"
title: "Criação da fila SQS"
description: "Crie a fila FIFO que armazenará os eventos de pedidos e identifique seu ARN."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Trabalho Prático"
type: "tutorial"
sequence: "trabalho-pratico-eda"
sequenceTitle: "Trabalho Prático — Arquitetura Orientada a Eventos"
step: 3
tags: ["aws", "sqs", "fifo", "pedidos", "eda"]
icon: "fab fa-aws"
readingMinutes: 8
updatedAt: "2026-10-23"
featured: false
order: 3
---

# Criação da fila SQS

## Objetivo da etapa

Criar a fila **SQS FIFO** `pedidos-efetuados-processamento.fifo`, que armazenará os eventos de pedidos até o consumer processá-los.

## Pré-requisitos

- Usuário IAM com `AmazonSQSFullAccess` configurado na etapa 1.
- Tópico `pedidos-efetuados.fifo` criado na etapa 2 e seu ARN anotado.
- Console na mesma conta do tópico e em **`us-east-1`**.

> **Sobre as imagens:** as capturas existentes mostram a localização dos campos, mas algumas ainda exibem nomes, contas ou permissões da versão anterior da aula. Siga os valores indicados no texto desta etapa.

## Passo a passo — Criando a fila

Crie uma fila para o processamento dos pedidos efetuados. Ela receberá os eventos do tópico SNS criado por você.

1. Digite **SQS** na caixa de pesquisa do console AWS.
2. Clique no serviço **SQS** e em **Criar fila** (*Create queue*).
3. **Selecione o tipo FIFO.**
4. Use o nome `pedidos-efetuados-processamento.fifo`. O sufixo `.fifo` é obrigatório para esse tipo de fila.

![Imagem 1: Criar fila](/images/aws-eventos/sqs/criar_fila.png)

5. Em **Criptografia** (*Encryption*), mantenha a criptografia habilitada e selecione **Chave do Amazon SQS (SSE-SQS)**. Essa opção não exige uma policy de chave KMS para a entrega pelo SNS.
6. Mantenha as demais opções padrão e clique em **Criar fila**. Ao final, você deverá ter uma fila conforme o print abaixo:

![Imagem 2: Resumo do SQS](/images/aws-eventos/sqs/resumo_sqs.png)

7. Copie o **ARN da fila**. Ele será usado na policy e no campo **Endpoint** da assinatura. Use o ARN, não a URL da fila.

![Localização do ARN da fila SQS na página de detalhes](/images/aws-eventos/access-policy/identificar_arn.png)

O ARN será semelhante ao exemplo abaixo. O número da conta é fictício; guarde o valor real exibido no seu console.

```text
arn:aws:sqs:us-east-1:123456789012:pedidos-efetuados-processamento.fifo
```

## Entendendo as configurações

- **FIFO:** mantém a ordem das mensagens de um mesmo grupo. O nome termina em `.fifo`, assim como o tópico adotado no trabalho.
- **SSE-SQS:** criptografa as mensagens armazenadas com uma chave gerenciada pelo próprio SQS. A integração apresentada não precisa de permissões adicionais em uma chave KMS. Não troque para SSE-KMS nesta prática, pois isso exigiria outra configuração de permissões.
- **Tempo de visibilidade:** ao receber uma mensagem, o consumer ou o console a torna temporariamente invisível para outros consumidores. Mantenha o padrão de 30 segundos nesta prática. Ler não significa excluir: após o prazo, ela pode reaparecer se não tiver sido confirmada/excluída.
- **Desduplicação:** mantenha as opções padrão da fila. O SNS FIFO encaminhará o ID de desduplicação junto com a mensagem; a configuração de desduplicação por conteúdo do tópico foi feita na etapa anterior.
- **Política de acesso:** preserve a policy padrão da fila por enquanto. Agora temos os dois ARNs e poderemos acrescentar a autorização de entrega pelo SNS na próxima etapa.

## Como verificar a conclusão

1. Abra a fila no SQS e confira o nome `pedidos-efetuados-processamento.fifo`, o tipo FIFO e a criptografia **SSE-SQS**.
2. Confira se o ARN da fila começa com `arn:aws:sqs:us-east-1:` e tem a mesma conta do ARN do SNS.
3. Guarde separadamente **ARN do tópico**, **ARN da fila** e **nome da fila**. O ARN é usado na policy e na assinatura; o nome será usado pelo consumer.

**Resultado esperado:** fila criada e os dois ARNs disponíveis. A fila ainda não recebe eventos do SNS, pois falta criar a assinatura.

## Próxima etapa

Continue em [Etapa 4 — Assinatura da fila no tópico SNS](/tutoriais/assinando-sqs-sns).
