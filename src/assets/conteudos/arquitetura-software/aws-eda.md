---
slug: "aws-eda"
title: "Arquitetura Orientada a Eventos na AWS (EDA)"
description: "Guia prático para configurar IAM, SQS, Access Policy e SNS para um fluxo Event-Driven."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Integração AWS"
type: "tutorial"
tags: ["aws", "iam", "sqs", "sns", "event-driven", "arquitetura"]
icon: "fab fa-aws"
readingMinutes: 15
updatedAt: "2026-08-08"
featured: true
order: 1
---

# Manual de Integração de Eventos na AWS

Este tutorial guia você na configuração de uma arquitetura orientada a eventos (EDA) utilizando IAM para segurança, SQS FIFO para mensageria e SNS para distribuição de notificações.

## Fase 1 - Configurando as Roles e Credenciais de Acesso

Criaremos um usuário IAM específico para o time e geraremos as credenciais de acesso.

1. Acesse o serviço IAM e clique em Usuários (Users).

![Imagem 1: Usuarios](/images/aws-eventos/iam/usuarios.png)

2. Clique em Criar usuário (Create User) e avance preenchendo os detalhes.

![Imagem 2: Usuarios](/images/aws-eventos/iam/detalhes_usuario.png)

3. Selecione "Anexar políticas diretamente" (Attach policies directly) e associe as políticas necessárias.

![Imagem 3: Anexar politicas diretamente](/images/aws-eventos/iam/anexar_politicas_diretamente.png)

4. Gere uma chave de acesso para uso local (Access key) e escolha a opção "Código Local".

![Imagem 5: Criar chave de acesso](/images/aws-eventos/iam/criar_chave_acesso.png)

![Imagem 6: Opção código local](/images/aws-eventos/iam/opcao_codigo_local.png)

5. Identifique suas chaves com uma etiqueta (ex.: Chave para consumo de eventos SQS) e conclua.

![Imagem 7: Etiqueta descrição](/images/aws-eventos/iam/etiqueta_descricao.png)

6. Guarde o par Access key/Secret key com segurança.

![Imagem 8: Chave de acesso criada](/images/aws-eventos/iam/chave_acesso_criada.png)

> Segurança: Nunca suba suas chaves reais para o GitHub. Em produção, use variáveis de ambiente.

## Fase 2 - Criando uma SQS FIFO

Crie uma fila SQS do tipo FIFO (terminada em .fifo) para garantir ordenação e entrega exatamente uma vez.

![Imagem 1: Criar fila](/images/aws-eventos/sqs/criar_fila.png)

Após criada, revise o resumo da fila e copie o ARN — iremos usá-lo na policy da próxima fase.

![Imagem 2: Resumo do SQS](/images/aws-eventos/sqs/resumo_sqs.png)

## Fase 3 - Autorizando a assinatura no SNS

Abra a fila SQS e edite a Access Policy para permitir que um tópico SNS publique mensagens nela. Use como base o JSON abaixo, substituindo o ARN da sua fila e (se necessário) o ARN do tópico SNS:

```json
{
  "Version": "2012-10-17",
  "Id": "AllowSNSPublish",
  "Statement": [
    {
      "Sid": "Allow-SNS-SendMessage",
      "Effect": "Allow",
      "Principal": { "Service": "sns.amazonaws.com" },
      "Action": "sqs:SendMessage",
      "Resource": "ARN_DA_SUA_FILA_SQS_QUE_VOCE_COPIOU",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "arn:aws:sns:us-east-1:630147069531:SNS-PEDIDO-EFETUADO.fifo"
        }
      }
    }
  ]
}
```

Algumas telas úteis durante a configuração:

![Identificar ARN da fila](/images/aws-eventos/access-policy/identificar_arn.png)

![Visualizar/editar política](/images/aws-eventos/access-policy/politica_sqs.png)

![Editar política](/images/aws-eventos/access-policy/editar_politica.png)

## Fase 4 - Inscrevendo a SQS no SNS

Localize o SNS informado pelo instrutor, inscreva sua fila SQS e verifique as assinaturas.

![Página do SNS](/images/aws-eventos/sns/sns_search.png)

![Detalhes/assinaturas](/images/aws-eventos/sns-signing/assinaturas_sns.png)

![Inscrever fila SQS](/images/aws-eventos/sns-signing/inscrever_sns.png)

![SQS assinado](/images/aws-eventos/sns-signing/sqs_assinado.png)

## Fase 5 - Configurando o recebimento da mensagem bruta

Habilite o recebimento de mensagem bruta (Raw message delivery) na assinatura entre SNS e SQS para simplificar a desserialização no seu Consumer.

![Editar raw messages](/images/aws-eventos/sns/sns_edit_raw_messages.png)

Se ocorrerem erros, verifique os detalhes de falhas/entregas no SNS:

![Erros de entrega](/images/aws-eventos/sns/sns_error_details.png)

---

### Próximos Passos

- Configure o seu Consumer SQS na aplicação (Spring) utilizando @SqsListener para ler mensagens da fila.
- Valide os eventos trafegando do SNS para a SQS e sendo processados pelo seu serviço.
- Em caso de dúvidas, consulte também o material "Configurando o Consumer SQS" disponível na área de Materiais.
