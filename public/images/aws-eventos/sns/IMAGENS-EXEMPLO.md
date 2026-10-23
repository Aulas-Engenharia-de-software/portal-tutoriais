# Imagens de exemplo do console AWS

As cinco imagens antes pendentes estão disponíveis nos tutoriais. Foram geradas com a ferramenta integrada imagegen e revisadas visualmente. São reproduções ilustrativas da interface AWS em português, não capturas de uma conta real nem réplicas pixel a pixel de uma versão específica do console. A conta 123456789012 é fictícia. Os passos e blocos de código do tutorial continuam sendo a referência para os valores a usar.

| Arquivo relativo a public/images/aws-eventos | Tela | Tutorial |
| --- | --- | --- |
| sns/criar-topico-pedidos-efetuados.png | Formulário SNS FIFO, desduplicação habilitada, criptografia opcional desabilitada | 02-sns.md |
| sns/detalhes-topico-pedidos-efetuados.png | Tópico criado, ARN fictício e nenhuma assinatura | 02-sns.md |
| sns/criar-assinatura-pedidos-efetuados.png | Protocolo Amazon SQS e ARN da fila; mensagem bruta habilitada no passo seguinte | 04-assinatura.md |
| sns/publicar-pedido-efetuado.png | Grupo, ID de desduplicação e JSON do evento | 05-consumer.md |
| sqs/pedido-efetuado-recebido.png | Mesmo JSON recebido sem envelope SNS | 05-consumer.md |

Os tutoriais ficam em src/assets/conteudos/arquitetura-software/trabalho-pratico-eda. O diagrama fluxo-pedidos-efetuados.svg e as capturas antigas foram preservados. Algumas capturas antigas ainda contêm nomes da versão anterior da aula; o aviso correspondente permanece nas etapas.

Os prompts completos e os ajustes finais estão em [docs/imagegen/aws-console-prompts.md](../../../../docs/imagegen/aws-console-prompts.md). Para substituir futuramente por capturas reais, mantenha os caminhos e atualize as legendas; oculte dados privados e credenciais.

Referências consultadas:
- [Criação de tópico SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html)
- [Publicação de mensagens SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-publishing.html)
- [Assinatura SNS/SQS](https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html)

Verificação: npm run content:check valida a existência das imagens usadas pelos documentos.
