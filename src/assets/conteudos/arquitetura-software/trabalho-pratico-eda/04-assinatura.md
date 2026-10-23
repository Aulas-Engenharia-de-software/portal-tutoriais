---
slug: "assinando-sqs-sns"
title: "Assinatura da fila SQS no SNS"
description: "Autorize a entrega de eventos e conecte sua fila ao tópico com mensagem bruta."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Trabalho Prático"
type: "tutorial"
sequence: "trabalho-pratico-eda"
sequenceTitle: "Trabalho Prático — Arquitetura Orientada a Eventos"
step: 4
tags: ["aws", "sqs", "sns", "policy", "assinatura", "eda"]
icon: "fab fa-aws"
readingMinutes: 12
updatedAt: "2026-10-23"
featured: false
order: 4
---

# Assinatura da fila SQS no SNS

## Objetivo da etapa

Autorizar o tópico `pedidos-efetuados.fifo` a enviar mensagens à fila `pedidos-efetuados-processamento.fifo` e criar a assinatura entre eles, com entrega de **JSON puro** e **sem filtros**.

## Pré-requisitos

- Etapas 1 a 3 concluídas: usuário com as policies de SNS/SQS, tópico FIFO e fila FIFO na mesma conta e região `us-east-1`.
- ARN real do tópico e ARN real da fila anotados.
- Criptografia da fila em **SSE-SQS**, conforme a etapa 3.

> **Sobre as imagens:** as capturas existentes mostram a localização dos campos, mas algumas ainda exibem nomes, contas ou permissões da versão anterior da aula. Siga os valores indicados no texto desta etapa.

## Passo 1 — Autorizando a entrega na policy da fila

Após criar a fila, precisamos autorizar o serviço SNS a entregar mensagens nela. A permissão IAM do usuário não substitui esta **policy da fila SQS**.

1. Tenha em mãos os ARNs anotados nas etapas 2 e 3 e abra **SQS → Filas → `pedidos-efetuados-processamento.fifo`**.
2. Vá à aba **Políticas de filas** (*Access policy*) e clique em **Editar** (*Edit*).

![Imagem 2: Política SQS](/images/aws-eventos/access-policy/politica_sqs.png)

3. Desça a página até encontrar o menu de **Política de acesso**.

![Imagem 3: Editar política](/images/aws-eventos/access-policy/editar_politica.png)

4. A policy abaixo mostra a regra necessária para a integração. Substitua os dois valores indicados pelos ARNs reais. **Preserve a policy existente:** acrescente o objeto com `Sid: Allow-SNS-SendMessage` à lista `Statement`, separando-o da regra anterior por uma vírgula. Não crie uma segunda lista `Statement` nem duplique a regra se ela já existir. O bloco completo mostra a estrutura para uma policy que tivesse apenas essa autorização.

```json
{
  "Version": "2012-10-17",
  "Id": "AllowSNSPublish",
  "Statement": [
    {
      "Sid": "Allow-SNS-SendMessage",
      "Effect": "Allow",
      "Principal": {
        "Service": "sns.amazonaws.com"
      },
      "Action": "sqs:SendMessage",
      "Resource": "ARN_DA_FILA_PEDIDOS_EFETUADOS",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "ARN_DO_TOPICO_PEDIDOS_EFETUADOS"
        }
      }
    }
  ]
}
```

| Valor a substituir | Onde encontrar |
| --- | --- |
| `ARN_DA_FILA_PEDIDOS_EFETUADOS` | SQS → `pedidos-efetuados-processamento.fifo` → Detalhes → ARN |
| `ARN_DO_TOPICO_PEDIDOS_EFETUADOS` | SNS → Tópicos → `pedidos-efetuados.fifo` → Detalhes → ARN |

Essa regra permite apenas ao serviço `sns.amazonaws.com` executar `sqs:SendMessage` nessa fila quando a origem for **o ARN do seu tópico**, indicado em `aws:SourceArn`.

5. Desça até o final da página e clique em **Salvar**.

## Passo 2 — Criando a assinatura no SNS

Conecte a fila ao tópico SNS que você criou na sua conta.

1. Acesse **Amazon SNS → Tópicos → `pedidos-efetuados.fifo`**.
2. Na seção **Assinaturas** (*Subscriptions*) do próprio tópico, clique em **Criar assinatura** (*Create subscription*).
3. Confira se o campo **ARN do tópico** contém o ARN do SNS que você criou.
4. Em **Protocolo**, selecione **Amazon SQS**.
5. Em **Endpoint**, cole o ARN da fila `pedidos-efetuados-processamento.fifo`.
6. Deixe a **Política de filtro de assinatura** sem configuração. Nesta prática, a fila receberá todos os eventos publicados nesse tópico.
7. Clique em **Criar assinatura**. Como o tópico e a fila pertencem à mesma conta, a assinatura deve ficar **Confirmada**, com um ID de assinatura.

![Criar assinatura no próprio SNS com protocolo Amazon SQS e ARN da fila como endpoint](/images/aws-eventos/sns/criar-assinatura-pedidos-efetuados.png)

*Exemplo ilustrativo do console AWS, gerado com ARNs fictícios. Use os ARNs dos seus recursos. A mensagem bruta será habilitada no passo seguinte.*

## Passo 3 — Habilitando a mensagem bruta

Ajuste a assinatura para receber apenas o conteúdo real do pedido (JSON puro), removendo o envelope com os metadados da AWS.

1. No tópico `pedidos-efetuados.fifo`, abra a assinatura cujo endpoint é o ARN da sua fila.
2. Clique em **Editar** (*Edit*).
3. Marque **Habilitar entrega de mensagem bruta** (*Enable raw message delivery*) e salve as alterações. Se já marcou essa opção na criação da assinatura, apenas confirme que está habilitada.

![Localização da opção de entrega de mensagem bruta; use os ARNs dos seus recursos](/images/aws-eventos/sns/sns_edit_raw_messages.png)

Se aparecer **Access denied**, confira as permissões IAM da etapa 1 e se está na conta e região em que criou o tópico. Corrija o acesso antes de prosseguir.

## Como verificar a conclusão

1. No tópico SNS, confira a assinatura **Confirmada**, protocolo **Amazon SQS** e endpoint exatamente igual ao ARN da sua fila.
2. Abra a assinatura e confirme a entrega de mensagem bruta habilitada e a política de filtro sem configuração. Não é necessário confirmar por e-mail uma assinatura da própria fila na mesma conta.
3. Na policy do SQS, confira `Resource` com o ARN da fila, `aws:SourceArn` com o ARN do tópico, `Principal.Service` igual a `sns.amazonaws.com` e a ação `sqs:SendMessage`. Remova os placeholders antes de salvar.

As permissões IAM autorizam **o usuário** a configurar os recursos; a policy da fila autoriza **o serviço SNS** a entregar eventos. A policy padrão do tópico mantém o acesso na própria conta. São responsabilidades diferentes e todas precisam estar corretas.

**Resultado esperado:** tópico e fila conectados. Na próxima etapa configuraremos o consumer e verificaremos a publicação no SNS, a entrega à fila e o processamento na aplicação.

Referências: [AWS — assinatura e permissões SNS/SQS](https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html) e [mensagem bruta](https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html).

## Próxima etapa

Continue em [Etapa 5 — Variáveis de ambiente e consumer SQS](/tutoriais/consumer-sqs).
