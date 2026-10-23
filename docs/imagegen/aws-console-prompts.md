# Prompts das imagens AWS

Ferramenta: imagegen integrada (sem CLI). Imagens ilustrativas geradas em 23/10/2026. Os arquivos finais estão em public/images/aws-eventos.

## sns/criar-topico-pedidos-efetuados.png

```text
Use case: ui-mockup. Generate one high fidelity educational screenshot-style replica of the Amazon AWS web management console, Portuguese Brazilian locale, SNS Create topic page. Landscape 1536x1024 or similar. Match AWS Cloudscape UI: dark navy global header with small white aws logo, search box 'Pesquisar', region 'Estados Unidos (Norte da Virgínia)', account 'Laboratório (123456789012)'; pale gray page background, thin gray borders, white rounded content cards, black sans serif text, blue links and selected controls, orange pill primary button. No browser chrome, arrows, annotation bubbles or decorative artwork. The image is a didactic simulation, not evidence of a real account; include small legible footer 'Exemplo ilustrativo • conta fictícia'.
Breadcrumb 'Amazon SNS > Tópicos > Criar tópico'. Main heading 'Criar tópico'. White card 'Detalhes'. Field 'Tipo': two side-by-side radio option cards, 'FIFO (primeiro a entrar, primeiro a sair)' selected with blue border and dot; 'Padrão' unselected. Field 'Nome' value EXACTLY 'pedidos-efetuados.fifo'. Checkbox checked 'Desduplicação de mensagens baseada em conteúdo'. Below, section 'Criptografia — opcional', unchecked 'Habilitar criptografia do lado do servidor'. Section 'Política de acesso — opcional', 'Básico' selected and text 'Somente o proprietário do tópico'. Bottom 'Cancelar' and orange 'Criar tópico'. Prioritize perfectly legible correct Portuguese and exact resource spelling. No errors, no extra invented settings, no real personal information. This image illustrates the completed form immediately before creation.
```

### Ajuste final

```text
Edit this AWS console educational mockup only to fix the small helper texts. Preserve all layout, fields, selected FIFO, checked content deduplication, unchecked encryption, exact resource name pedidos-efetuados.fifo, footer and all buttons. Remove the entire small gray explanatory paragraph immediately under the checked "Desduplicação de mensagens baseada em conteúdo" checkbox. It contains garbled text. Leave that area blank. Also remove the small gray sentence below the Nome input; leave blank. Do not replace either with new text. Keep the other controls and text unchanged. No extra elements.
```

## sns/detalhes-topico-pedidos-efetuados.png

```text
Use case: ui-mockup. Generate a high fidelity educational screenshot-style replica of AWS console in Brazilian Portuguese. Landscape 1536x1024. Match AWS Cloudscape: navy top bar with white aws logo, search 'Pesquisar', region 'Estados Unidos (Norte da Virgínia)', fictional account 'Laboratório (123456789012)'; light gray background, white rounded cards, thin gray borders, sharp black sans serif text, blue links and selected controls, orange pill primary buttons. No browser window chrome. Minimal text: only the exact labels and values specified, no invented help paragraphs, no gibberish. All long ARNs must fit without truncation. No callout arrows, no decoration. Include unobtrusive footer 'Exemplo ilustrativo • conta fictícia'.
Page breadcrumb 'Amazon SNS > Tópicos > pedidos-efetuados.fifo'. Title 'pedidos-efetuados.fifo'. Top actions 'Editar', 'Excluir', orange 'Publicar mensagem'. Green success banner 'Tópico criado com sucesso'. Main card 'Detalhes' with fields: 'Nome' value 'pedidos-efetuados.fifo'; 'Tipo' value 'FIFO'; 'ARN' full value 'arn:aws:sns:us-east-1:123456789012:pedidos-efetuados.fifo' and small copy icon; 'Desduplicação baseada em conteúdo' value 'Habilitada'. Lower tabs 'Assinaturas' selected, 'Política de acesso', 'Criptografia'. Lower card 'Assinaturas (0)' with orange 'Criar assinatura' button, table columns 'ID', 'Endpoint', 'Protocolo', 'Status', empty table showing 'Nenhuma assinatura'. Do not show any subscription: queue has not been created at this step.
```

## sns/criar-assinatura-pedidos-efetuados.png

```text
Use case: ui-mockup. Generate a high fidelity educational screenshot-style replica of AWS console in Brazilian Portuguese. Landscape 1536x1024. Match AWS Cloudscape: navy top bar with white aws logo, search 'Pesquisar', region 'Estados Unidos (Norte da Virgínia)', fictional account 'Laboratório (123456789012)'; light gray background, white rounded cards, thin gray borders, sharp black sans serif text, blue links and selected controls, orange pill primary buttons. No browser window chrome. Minimal text: only the exact labels and values specified, no invented help paragraphs, no gibberish. All long ARNs must fit without truncation. No callout arrows, no decoration. Include unobtrusive footer 'Exemplo ilustrativo • conta fictícia'.
Page breadcrumb 'Amazon SNS > Tópicos > pedidos-efetuados.fifo > Criar assinatura'. Title 'Criar assinatura'. Main form card 'Detalhes' with 'ARN do tópico' input containing EXACT 'arn:aws:sns:us-east-1:123456789012:pedidos-efetuados.fifo'; 'Protocolo' dropdown value 'Amazon SQS'; 'Endpoint' input containing EXACT 'arn:aws:sqs:us-east-1:123456789012:pedidos-efetuados-processamento.fifo'. Keep generous input width and readable font for long strings. Checkbox 'Habilitar entrega de mensagem bruta' UNCHECKED, as the tutorial enables this in the following edit step. Beneath card, collapsed panels 'Política de filtro de assinatura — opcional' and 'Política de redirecionamento — opcional'. No filters configured, no JSON editor. Bottom buttons 'Cancelar', orange 'Criar assinatura'.
```

### Ajuste final

```text
Edit this educational AWS console screenshot mockup. Change ONLY the outlined button text near the bottom which incorrectly reads "Crancelar": it must read exactly "Cancelar", spelled C a n c e l a r. Preserve everything else pixel faithfully: entire layout, colors, typography, topic ARN, queue ARN, fictional account, unchecked raw delivery box, collapsed filter panels, title and orange "Criar assinatura" button and illustrative footer. No other changes.
```

## sns/publicar-pedido-efetuado.png

```text
Use case: ui-mockup. Generate a high fidelity educational screenshot-style replica of AWS console in Brazilian Portuguese. Landscape 1536x1024. AWS Cloudscape design: navy top bar with white aws logo, search 'Pesquisar', region 'Estados Unidos (Norte da Virgínia)', fictional account 'Laboratório (123456789012)'; light gray background, white rounded cards, thin gray borders, sharp black sans serif text, blue links, orange primary buttons. No browser chrome, no annotations or arrows. Only specified labels and values, no invented helper text. Include small footer 'Exemplo ilustrativo • conta fictícia'. Use correct sharp typography and EXACT resource names and JSON.
Breadcrumb 'Amazon SNS > Tópicos > pedidos-efetuados.fifo > Publicar mensagem'. Main heading 'Publicar mensagem'. Compact top card 'Detalhes da mensagem'. Label 'Tópico', value 'pedidos-efetuados.fifo'. Label 'Assunto — opcional', empty input. Two side-by-side fields: 'ID do grupo de mensagens' value 'pedido-1001'; 'ID de desduplicação da mensagem' value 'evento-pedido-1001-001'. Lower larger card 'Corpo da mensagem'. Radio 'Payload idêntico para todos os protocolos de entrega' SELECTED and radio 'Payload personalizado para cada protocolo' unselected. Below big legible monospaced editor with exactly this JSON, double quotes, all six fields and closing brace:
{
  "eventId": "evento-pedido-1001-001",
  "eventType": "PedidoEfetuado",
  "orderId": "pedido-1001",
  "customerId": "cliente-42",
  "total": 149.90,
  "currency": "BRL"
}
Below card small collapsed panel 'Atributos da mensagem — opcional'. Bottom 'Cancelar' and orange 'Publicar mensagem'. All content fits image uncropped. JSON is the central focus, keep text perfectly legible.
```

## sqs/pedido-efetuado-recebido.png

```text
Use case: ui-mockup. Generate a high fidelity educational screenshot-style replica of AWS console in Brazilian Portuguese. Landscape 1536x1024. AWS Cloudscape design: navy top bar with white aws logo, search 'Pesquisar', region 'Estados Unidos (Norte da Virgínia)', fictional account 'Laboratório (123456789012)'; light gray background, white rounded cards, thin gray borders, sharp black sans serif text, blue links, orange primary buttons. No browser chrome, no annotations or arrows. Only specified labels and values, no invented helper text. Include small footer 'Exemplo ilustrativo • conta fictícia'. Use correct sharp typography and EXACT resource names and JSON.
Show Amazon SQS console with opened message details modal over the send/receive messages page. Background breadcrumb 'Amazon SQS > Filas > pedidos-efetuados-processamento.fifo > Enviar e receber mensagens'. Faint background 'Receber mensagens', 'Sondar mensagens', 'Mensagens (1)'. Large foreground white modal with 'Detalhes da mensagem' heading and X top right. Under heading small label 'Fila' value EXACT 'pedidos-efetuados-processamento.fifo'. Tabs 'Corpo' selected in blue, 'Atributos', 'Atributos da mensagem'. Main modal body large code viewer monospaced exact JSON:
{
  "eventId": "evento-pedido-1001-001",
  "eventType": "PedidoEfetuado",
  "orderId": "pedido-1001",
  "customerId": "cliente-42",
  "total": 149.90,
  "currency": "BRL"
}
The body must contain ONLY that JSON, no SNS envelope, no Notification/Message wrapper fields. Bottom modal only 'Fechar' button. Do not show delete button or imply deleting this message. Make this a convincingly crisp AWS console reconstruction, code high contrast, large readable font.
```
