---
slug: "aws-eda"
title: "Arquitetura Orientada a Eventos na AWS (EDA)"
description: "Configure IAM e uma fila SQS, assine seu próprio SNS e teste a entrega de eventos de pedidos efetuados."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Integração AWS"
type: "tutorial"
tags: ["aws", "iam", "sqs", "sns", "event-driven", "arquitetura"]
icon: "fab fa-aws"
readingMinutes: 20
updatedAt: "2026-10-22"
featured: true
order: 1
---

# Manual de Integração de Eventos na AWS

Este tutorial guia você na configuração de uma arquitetura orientada a eventos (EDA) utilizando **IAM** para segurança, **SQS FIFO** para mensageria e **SNS FIFO** para distribuição de eventos de pedidos efetuados.

Ao final, uma mensagem publicada no tópico `pedidos-efetuados.fifo` será entregue à fila `pedidos-efetuados-processamento.fifo`. Criaremos **um tópico e uma fila na mesma conta AWS e na mesma região**, usando `us-east-1` (Norte da Virgínia) como referência.

![Fluxo de um evento de pedido efetuado: publicação no SNS e entrega à fila SQS](/images/aws-eventos/sns/fluxo-pedidos-efetuados.svg)

> **Sobre as imagens:** as capturas já existentes ilustram a localização dos campos e podem mostrar nomes, contas e permissões da versão anterior da aula. Use os nomes, ARNs e policies descritos no texto atualizado.

## Fase 1 — Segurança em primeiro lugar (IAM)

O líder do grupo não deve compartilhar sua senha Root. Criaremos um usuário IAM específico para o time.

1. Pesquise por **IAM** na barra de pesquisa do console da AWS e vá em **Usuários** (*Users*).
2. Você deve encontrar uma tela conforme a seguinte:

![Imagem 1: Usuários](/images/aws-eventos/iam/usuarios.png)

3. Clique em **Criar usuário** (*Create user*).
4. Nome do usuário: `Grupo_Arquitetura_Software_AWS`.

![Imagem 2: Detalhes do usuário](/images/aws-eventos/iam/detalhes_usuario.png)

5. Escolha a opção **Anexar políticas diretamente** (*Attach policies directly*).

![Imagem 3: Anexar políticas diretamente](/images/aws-eventos/iam/anexar_politicas_diretamente.png)

6. Pesquise na caixa de texto e anexe as seguintes políticas:
   - `AmazonSQSFullAccess`
   - `AmazonSNSFullAccess`
7. No último passo da criação, você deverá ver uma tela conforme a imagem abaixo:

![Imagem 4: Revisão dos dados do usuário](/images/aws-eventos/iam/revisao_usuario.png)

> **Permissões para o laboratório:** `AmazonSNSFullAccess` permite criar o tópico, gerenciar a assinatura e publicar mensagens; `AmazonSQSFullAccess` permite criar a fila, editar sua policy e receber mensagens. Se já fez a versão anterior, substitua `AmazonSNSReadOnlyAccess` por `AmazonSNSFullAccess`. São permissões amplas para esta prática; em produção, limite as ações e os recursos usados por cada aplicação.

8. Acesse o usuário que você acabou de criar: `Grupo_Arquitetura_Software_AWS`.
9. Clique em **Criar chave de acesso** (*Create access key*).

![Imagem 5: Criar chave de acesso](/images/aws-eventos/iam/criar_chave_acesso.png)

10. Escolha a opção **Código Local**.

![Imagem 6: Opção código local](/images/aws-eventos/iam/opcao_codigo_local.png)

11. Na opção **Definir etiqueta de descrição**, dê uma etiqueta como *Chave para consumo de eventos SQS*.

![Imagem 7: Etiqueta de descrição](/images/aws-eventos/iam/etiqueta_descricao.png)

12. **Faça o download do arquivo .csv com as credenciais criadas.**

![Imagem 8: Chave de acesso criada](/images/aws-eventos/iam/chave_acesso_criada.png)

> **Importante:** baixe o arquivo .csv. A Secret Key só é exibida uma vez!

Para os passos no console, use uma identidade IAM com as permissões acima e acesso ao console habilitado. As chaves do arquivo .csv serão usadas pela aplicação, conforme o [tutorial de variáveis de ambiente](/tutoriais/env-vars).

**Antes de continuar:** siga o tutorial [Criando um SNS para eventos de pedidos efetuados](/tutoriais/criando-sns) para criar o tópico `pedidos-efetuados.fifo` e copiar seu ARN. Depois, retorne à Fase 2 abaixo. Se o tópico já existe, basta copiar seu ARN no console SNS.

## Fase 2 — Criando a fila SQS

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

## Fase 3 — Configurando a Access Policy

Após criar a fila, precisamos autorizar o serviço SNS a entregar mensagens nela. A permissão IAM do usuário não substitui esta **policy da fila SQS**.

1. Na sua fila, encontre o campo **ARN** e copie o endereço.

![Imagem 1: Identificar ARN](/images/aws-eventos/access-policy/identificar_arn.png)

2. Vá à aba **Políticas de filas** (*Access policy*) e clique em **Editar** (*Edit*).

![Imagem 2: Política SQS](/images/aws-eventos/access-policy/politica_sqs.png)

3. Desça a página até encontrar o menu de **Política de acesso**.

![Imagem 3: Editar política](/images/aws-eventos/access-policy/editar_politica.png)

4. Para a fila nova deste exercício, use a policy abaixo e substitua os dois valores indicados. Se a fila já tiver outras permissões necessárias, preserve-as e acrescente somente o objeto `Allow-SNS-SendMessage` à lista `Statement` da policy existente.

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

## Fase 4 — Inscrevendo a SQS no SNS

Conecte a fila ao tópico SNS que você criou na sua conta.

1. Acesse **Amazon SNS → Tópicos → `pedidos-efetuados.fifo`**.
2. Na seção **Assinaturas** (*Subscriptions*) do próprio tópico, clique em **Criar assinatura** (*Create subscription*).
3. Confira se o campo **ARN do tópico** contém o ARN do SNS que você criou.
4. Em **Protocolo**, selecione **Amazon SQS**.
5. Em **Endpoint**, cole o ARN da fila `pedidos-efetuados-processamento.fifo`.
6. Deixe a **Política de filtro de assinatura** sem configuração. Nesta prática, a fila receberá todos os eventos publicados nesse tópico.
7. Clique em **Criar assinatura**. Como o tópico e a fila pertencem à mesma conta, a assinatura deve ficar **Confirmada**, com um ID de assinatura.

<!-- CAPTURA PENDENTE: salvar em public/images/aws-eventos/sns/criar-assinatura-pedidos-efetuados.png e descomentar a imagem abaixo.
![Criar assinatura no próprio SNS com protocolo Amazon SQS e ARN da fila como endpoint](/images/aws-eventos/sns/criar-assinatura-pedidos-efetuados.png)
-->

## Fase 5 — Habilitando a mensagem bruta

Ajuste a assinatura para receber apenas o conteúdo real do pedido (JSON puro), removendo o envelope com os metadados da AWS.

1. No tópico `pedidos-efetuados.fifo`, abra a assinatura cujo endpoint é o ARN da sua fila.
2. Clique em **Editar** (*Edit*).
3. Marque **Habilitar entrega de mensagem bruta** (*Enable raw message delivery*) e salve as alterações. Se já marcou essa opção na criação da assinatura, apenas confirme que está habilitada.

![Localização da opção de entrega de mensagem bruta; use os ARNs dos seus recursos](/images/aws-eventos/sns/sns_edit_raw_messages.png)

Se aparecer **Access denied**, confira as permissões IAM da Fase 1 e se está na conta e região em que criou o tópico. Corrija o acesso antes de prosseguir.

## Fase 6 — Testando o fluxo SNS → SQS

Publique um evento no SNS e confira sua chegada à única fila criada neste tutorial.

1. No console **SNS**, abra o tópico `pedidos-efetuados.fifo` e clique em **Publicar mensagem** (*Publish message*).
2. Informe `pedido-1001` em **ID do grupo de mensagens** (*Message group ID*). Esse campo é obrigatório para um tópico FIFO.
3. Em **ID de desduplicação da mensagem** (*Message deduplication ID*), informe `evento-pedido-1001-001`. Use um ID novo a cada novo evento de teste. O campo pode ficar vazio se a desduplicação baseada em conteúdo estiver habilitada no tópico.
4. Em **Corpo da mensagem**, selecione **Payload idêntico para todos os protocolos de entrega** (*Identical payload for all delivery protocols*) e cole este JSON:

```json
{
  "eventId": "evento-pedido-1001-001",
  "eventType": "PedidoEfetuado",
  "orderId": "pedido-1001",
  "customerId": "cliente-42",
  "total": 149.90,
  "currency": "BRL"
}
```

5. Deixe o assunto e os atributos opcionais em branco e clique em **Publicar mensagem**.

<!-- CAPTURA PENDENTE: salvar em public/images/aws-eventos/sns/publicar-pedido-efetuado.png e descomentar a imagem abaixo.
![Publicação do evento PedidoEfetuado no SNS com grupo, ID de desduplicação e corpo JSON](/images/aws-eventos/sns/publicar-pedido-efetuado.png)
-->

6. No console **SQS**, abra `pedidos-efetuados-processamento.fifo` → **Enviar e receber mensagens** (*Send and receive messages*) → **Sondar mensagens** (*Poll for messages*).
7. Abra a mensagem recebida e confira o corpo: ele deve conter o JSON do pedido, incluindo `eventType: PedidoEfetuado`, sem o envelope de notificação do SNS. Mantenha o consumer Java parado durante essa conferência para que ele não consuma a mensagem antes do console.

<!-- CAPTURA PENDENTE: salvar em public/images/aws-eventos/sqs/pedido-efetuado-recebido.png e descomentar a imagem abaixo.
![Evento PedidoEfetuado recebido na fila SQS com o corpo JSON original](/images/aws-eventos/sqs/pedido-efetuado-recebido.png)
-->

> **Repetindo o teste:** eventos com o mesmo ID de desduplicação dentro de cinco minutos podem ser aceitos pelo SNS sem uma nova entrega. Altere o ID de desduplicação e o `eventId` para testar um novo evento. Se omitir o ID e usar desduplicação baseada em conteúdo, altere o corpo do JSON. Ao receber pelo console, a mensagem também fica temporariamente invisível durante o tempo de visibilidade da fila.

Se a mensagem não chegar, confira a assinatura **Confirmada**, os dois ARNs da policy da fila, a região e a opção **SSE-SQS**. A policy apresentada pressupõe essa criptografia; SSE-KMS exige permissões adicionais na chave KMS.

O fluxo está pronto: **mensagem publicada no seu SNS → evento recebido na sua SQS**. Para consumir os pedidos na aplicação, continue no [tutorial do Consumer SQS com Spring Boot](/tutoriais/consumer-sqs).

## Referências

- [AWS: assinatura e permissões para entregar mensagens do SNS ao SQS](https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html).
- [AWS: entrega de mensagem bruta](https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html).
- [AWS: publicação de mensagens no SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-publishing.html).
- [AWS: desduplicação em tópicos FIFO](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html).
