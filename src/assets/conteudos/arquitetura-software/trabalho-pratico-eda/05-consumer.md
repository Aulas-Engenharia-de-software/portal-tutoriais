---
slug: "consumer-sqs"
title: "Variáveis de ambiente e consumer SQS"
description: "Configure IntelliJ ou VS Code, conecte o adapter Spring Boot e valide SNS, SQS e consumer."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Trabalho Prático"
type: "tutorial"
sequence: "trabalho-pratico-eda"
sequenceTitle: "Trabalho Prático — Arquitetura Orientada a Eventos"
step: 5
tags: ["java", "spring boot", "aws", "sqs", "hexagonal", "adapter", "variaveis de ambiente", "intellij", "vscode"]
icon: "fas fa-stream"
readingMinutes: 25
updatedAt: "2026-10-23"
featured: false
order: 5
---

# Variáveis de ambiente e consumer SQS

## Objetivo da etapa

Configurar as credenciais por variáveis de ambiente, conectar a aplicação Java/Spring Boot à fila e validar o fluxo completo. O listener continua sendo um **adapter**, mantendo a mensageria separada da regra de negócio por meio de `PedidoServicePort`.

## Pré-requisitos

- Etapas 1 a 4 concluídas: credenciais IAM guardadas, tópico `pedidos-efetuados.fifo`, fila `pedidos-efetuados-processamento.fifo`, policy de entrega e assinatura confirmada, sem filtros e com mensagem bruta habilitada.
- Recursos na mesma conta e região **`us-east-1`**.
- Projeto Java/Spring Boot da atividade com Maven, JDK 17 ou superior e a regra de negócio de pedidos. Para as versões já adotadas aqui, use Spring Boot **3.5.x**, Spring Cloud **2025.0.0** e Spring Cloud AWS **3.4.0**; confira o `pom.xml` antes de copiar os trechos.
- IntelliJ IDEA ou VS Code com suporte a Java. A implementação do serviço de pedidos será reutilizada, e a DTO será compatível com o evento mostrado nesta página.

## Passo 1 — Dependências do projeto

1. Adicione o starter do Spring Cloud AWS ao seu `pom.xml`. Ele contém as bibliotecas necessárias para utilizar o `@SqsListener`.

```xml
<dependency>
  <groupId>io.awspring.cloud</groupId>
  <artifactId>spring-cloud-aws-starter-sqs</artifactId>
</dependency>
```

2. Inclua também o gerenciamento de dependências para manter as versões do Spring Cloud e do SDK da AWS compatíveis:

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>2025.0.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>

    <dependency>
      <groupId>io.awspring.cloud</groupId>
      <artifactId>spring-cloud-aws-dependencies</artifactId>
      <version>3.4.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

O starter fica dentro de `<dependencies>` do projeto. O bloco `<dependencyManagement>` fica diretamente dentro de `<project>`; se já existir, incorpore as entradas sem criar blocos duplicados. Recarregue o projeto Maven na IDE após salvar. O gerenciamento de dependências define as versões; ele não substitui a inclusão do starter.

## Passo 2 — Variáveis de ambiente e credenciais

Subir Access Key e Secret Key no GitHub expõe a conta AWS. Essas credenciais devem ser lidas do ambiente durante a execução. Se alguma chave já foi publicada, peça sua revogação/substituição antes de usá-la novamente.

1. Em `src/main/resources/application.properties`, em vez de colocar as chaves diretamente no arquivo, informe ao Spring Boot para buscá-las do ambiente no momento da execução.

> **Atenção:** apague suas chaves reais do código antes de continuar.

```properties
# Credenciais AWS Dinâmicas
spring.cloud.aws.credentials.access-key=${AWS_ACCESS_KEY_ID}
spring.cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY}
spring.cloud.aws.region.static=us-east-1

# Filas
queue.order-events=pedidos-efetuados-processamento.fifo
```

O formato `${VARIAVEL}` indica ao Spring que o valor virá do ambiente da execução. Use as chaves guardadas na etapa 1, a região `us-east-1` e o nome exato da fila da etapa 3.

Escolha **apenas uma** das opções de IDE abaixo. As variáveis precisam estar na configuração que inicia a aplicação; configurá-las em outra execução ou em um terminal diferente não as disponibiliza automaticamente ao processo Java.

### Opção A — IntelliJ IDEA

As variáveis são injetadas na configuração de execução (Run/Debug Configurations).

1. No canto superior direito, ao lado do botão de "Play", clique na seta para baixo e selecione "Edit Configurations...".

![Imagem 1: Configuração de execução no IntelliJ](/images/env-vars/intellij/intellij_config_execucao.png)

2. No campo "Environment variables", adicione suas chaves no formato `CHAVE=VALOR` separadas por ponto e vírgula (`;`).

```text
AWS_ACCESS_KEY_ID=sua_access_key;AWS_SECRET_ACCESS_KEY=sua_secret_key
```

![Imagem 2: Configurando variáveis de ambiente no IntelliJ](/images/env-vars/intellij/setting_env_vars.png)

3. Caso o campo não apareça, clique em "Modify Options" e habilite "Environment Variables".

![Imagem 3: Adicionando variáveis de ambiente na configuração de execução do IntelliJ](/images/env-vars/intellij/add_env_var_config.png)

4. Ao final, sua configuração de execução deve ficar conforme a imagem abaixo.

![Imagem 4: Variáveis de ambiente configuradas na execução do IntelliJ](/images/env-vars/intellij/env_vars_configured.png)

5. Clique em **Apply** e depois em **OK** para salvar. Ao executar a aplicação com essa configuração, as variáveis de ambiente serão injetadas automaticamente.

### Opção B — VS Code

Se você usa o Visual Studio Code com a extensão Java, as configurações ficam no arquivo `launch.json`.

1. Abra a barra lateral de execução (Run and Debug) e clique na engrenagem para abrir o `launch.json`.

![Imagem 1: Abrindo o arquivo launch.json no VS Code para configurar a execução e depuração](/images/env-vars/vscode/vscode_open_launch.png)

2. Caso a tela de criação apareça, escolha criar o `launch.json`.

![Imagem 2: Criando o arquivo launch.json para configurar a execução e depuração no VS Code](/images/env-vars/vscode/vscode_run_debug_config.png)

3. Se tiver as extensões Java instaladas, selecione a opção de Java.

![Imagem 3: Escolhendo a extensão Java Extension Pack no VS Code para configurar o ambiente de desenvolvimento Java](/images/env-vars/vscode/vscode_choose_java.png)

4. Dentro da sua configuração atual, adicione a propriedade `env` com suas chaves reais, conforme o exemplo abaixo. Os valores de `mainClass` e `projectName` são exemplos da aula: mantenha a classe `@SpringBootApplication` e o nome reais do seu projeto.

```json
{
  "configurations": [
    {
      "type": "java",
      "name": "ArquiteturaHexagonalApplication",
      "request": "launch",
      "mainClass": "com.fag.lucasmartins.arquitetura_software.ArquiteturaHexagonalApplication",
      "projectName": "t02n-arquitetura-software",
      "env": {
        "AWS_ACCESS_KEY_ID": "COLE_SUA_ACCESS_KEY_AQUI",
        "AWS_SECRET_ACCESS_KEY": "COLE_SUA_SECRET_KEY_AQUI"
      }
    }
  ]
}
```

5. Ao final, seu `launch.json` e a estrutura de pastas devem se parecer com o seguinte:

![Imagem 4: Configuração de variáveis de ambiente no VS Code para o projeto Java](/images/env-vars/vscode/vscode_env_configurada.png)

> **Antes de versionar:** configurações locais da IDE que contenham credenciais também devem ficar fora do Git. Adicione `.vscode/launch.json` e as configurações de execução do IntelliJ com segredos ao `.gitignore`; prefira guardar o `.csv` fora do projeto. Se um arquivo já está versionado, o `.gitignore` não remove seu histórico: revogue chaves expostas e substitua-as. Não imprima chaves nos logs.

**Conferência do ambiente:** as duas variáveis precisam estar preenchidas na configuração escolhida. A senha do console não serve como Secret Access Key. O nome `queue.order-events` recebe o nome da fila, não seu ARN e nem sua URL.


## Passo 3 — Adapter de entrada e contrato do evento

1. Crie uma classe responsável por ouvir a fila. Receba uma DTO compatível com o JSON publicado e delegue o processamento para uma porta da aplicação.

```java
import io.awspring.cloud.sqs.annotation.SqsListener;
import org.springframework.stereotype.Component;

@Component
public class SqsPedidoAdapter {

    private final PedidoServicePort pedidoServicePort;

    public SqsPedidoAdapter(PedidoServicePort pedidoServicePort) {
        this.pedidoServicePort = pedidoServicePort;
    }

    @SqsListener("${queue.order-events}")
    public void listen(SuaDTO dto) {
        System.out.println("Mensagem recebida: " + dto.getCustomerId() + " | evento: " + dto.getEventId());
        pedidoServicePort.process(dto);
        System.out.println("Mensagem consumida com sucesso.");
    }
}
```

> **Dica:** confira se os nomes dos atributos da DTO correspondem ao JSON de pedido publicado no seu SNS, conforme o evento de teste apresentado nesta página. Quando forem diferentes, use `@JsonProperty` do Jackson para fazer o mapeamento explícito.

### DTO do evento e porta de aplicação

No exemplo, `SuaDTO` representa o corpo JSON do pedido. Se a DTO já existir no projeto, mantenha-a e confira o mapeamento dos campos. Para uma DTO simples compatível com o evento desta prática, use:

```java
import java.math.BigDecimal;

public class SuaDTO {
    private String eventId;
    private String eventType;
    private String orderId;
    private String customerId;
    private BigDecimal total;
    private String currency;

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
```

`PedidoServicePort` é a porta da aplicação usada pelo adapter. Sua assinatura deve aceitar essa DTO (ou a DTO equivalente do projeto):

```java
public interface PedidoServicePort {
    void process(SuaDTO dto);
}
```

Reutilize a implementação de serviço da atividade que processa e persiste os pedidos e registre-a como bean do Spring, por exemplo com `@Service`. O tutorial não substitui essa regra de negócio. Deve existir uma implementação injetável de `PedidoServicePort`; se ela não existir, a aplicação falhará ao iniciar. Coloque cada classe em seu arquivo, nos pacotes do projeto, e ajuste os imports da DTO e da porta no adapter. O adapter e a implementação do serviço devem estar dentro dos pacotes escaneados pela classe `@SpringBootApplication`.

O `@SqsListener` resolve `${queue.order-events}`, recebe o JSON e o converte para a DTO. A mensagem bruta habilitada na etapa 4 evita que o envelope SNS atrapalhe essa conversão. O adapter continua delegando o processamento à porta, sem incorporar a regra de negócio.

Com a confirmação padrão **ON_SUCCESS**, o framework confirma/exclui a mensagem depois que o processamento termina com sucesso. Não capture uma falha apenas para ignorá-la: deixe a exceção chegar ao listener quando o pedido não puder ser processado, para permitir nova tentativa. O tempo de visibilidade deve ser suficiente para o processamento real.


## Passo 4 — Validando SNS → SQS → consumer

Para observar as três partes do fluxo com o mesmo evento, mantenha a aplicação Java **parada** primeiro. Publique no SNS, confira no SQS e só então inicie o consumer.

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

![Publicação do evento PedidoEfetuado no SNS com grupo, ID de desduplicação e corpo JSON](/images/aws-eventos/sns/publicar-pedido-efetuado.png)

*Exemplo ilustrativo do console AWS, gerado com os mesmos valores do evento acima.*

6. No console **SQS**, abra `pedidos-efetuados-processamento.fifo` → **Enviar e receber mensagens** (*Send and receive messages*) → **Sondar mensagens** (*Poll for messages*).
7. Abra a mensagem recebida e confira o corpo: ele deve conter o JSON do pedido, incluindo `eventType: PedidoEfetuado`, sem o envelope de notificação do SNS. Não exclua a mensagem pelo console. Pare a sondagem e feche a tela de recebimento após conferir o JSON; assim ela poderá ser recebida pela aplicação.

![Evento PedidoEfetuado recebido na fila SQS com o corpo JSON original](/images/aws-eventos/sqs/pedido-efetuado-recebido.png)

*Exemplo ilustrativo da mensagem recebida. Confira o JSON puro e feche os detalhes sem excluir a mensagem.*

> **Repetindo o teste:** eventos com o mesmo ID de desduplicação dentro de cinco minutos podem ser aceitos pelo SNS sem uma nova entrega. Altere o ID de desduplicação e o `eventId` para testar um novo evento. Se omitir o ID e usar desduplicação baseada em conteúdo, altere o corpo do JSON. Ao receber pelo console, a mensagem também fica temporariamente invisível durante o tempo de visibilidade da fila.

Se a mensagem não chegar, confira a assinatura **Confirmada**, os dois ARNs da policy da fila, a região e a opção **SSE-SQS**. A policy apresentada pressupõe essa criptografia; SSE-KMS exige permissões adicionais na chave KMS.

8. Aguarde o tempo de visibilidade configurado na fila (30 segundos com o padrão da etapa 3), contado do último recebimento pelo console. A mensagem deve ficar disponível novamente.
9. Inicie a aplicação pela configuração **Run/Debug** da IDE em que você definiu as variáveis. Não mantenha outro consumer ou a sondagem do console disputando essa fila durante o teste.
10. Confira os logs do adapter:

```text
Mensagem recebida: cliente-42 | evento: evento-pedido-1001-001
Mensagem consumida com sucesso.
```

11. Verifique que a implementação de `PedidoServicePort` processou o `orderId: pedido-1001` e, quando a regra de negócio persistir pedidos, confira o registro no banco. A confirmação bem-sucedida retira a mensagem da fila.
12. Para testar com a aplicação já ligada, publique outro pedido no SNS com novos `eventId`, `orderId` e ID de desduplicação. Nesse caso, a mensagem pode ser consumida tão rápido que você não a verá disponível no console; use o `eventId` dos logs para identificá-la.

## Como verificar a conclusão do trabalho

- A publicação foi realizada no **SNS** `pedidos-efetuados.fifo` com um ID de grupo e um ID de desduplicação adequado.
- O **SQS** `pedidos-efetuados-processamento.fifo` recebeu o JSON original do evento.
- O **consumer** registrou o mesmo `eventId` e concluiu `pedidoServicePort.process(dto)` sem erro.
- A regra de negócio executou o efeito esperado, como persistir o pedido, e a mensagem foi confirmada/excluída após o sucesso.

## Se algo não funcionar

| Sintoma | O que conferir |
| --- | --- |
| `Could not resolve placeholder` | Variáveis na configuração de execução realmente usada; grafia `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` |
| Credencial inválida ou `Access denied` | Chave ativa do usuário correto, conta e policies da etapa 1; não usar a senha do console como chave |
| Fila não encontrada ou leitura de outra fila | `us-east-1`, conta das credenciais e nome `pedidos-efetuados-processamento.fifo`; não usar ARN no lugar do nome configurado |
| SNS publica, mas nada chega ao SQS | Assinatura confirmada, os dois ARNs na policy, ausência de filtros, SSE-SQS e deduplicação de cinco minutos |
| Mensagem chegou, mas não aparece ao consumer | Tempo de visibilidade após a sondagem; outro consumer ou console lendo a mesma fila |
| Erro ao converter o JSON | Entrega de mensagem bruta habilitada, corpo publicado com payload idêntico, nomes/tipos da DTO e `@JsonProperty` quando necessário |
| Falha ao iniciar por falta de `PedidoServicePort` | Implementação de serviço registrada no Spring e pacotes incluídos no component scan |
| O mesmo pedido volta à fila | Falha no processamento/confirmação ou processamento maior que o tempo de visibilidade; examine a exceção e a regra de negócio |

## Conclusão e continuação opcional

Você concluiu **publicação no SNS → entrega na fila SQS → recebimento pelo consumer**. As cinco etapas do trabalho terminam aqui. Como aprofundamento, o [tutorial de Dead Letter Queue](/tutoriais/dlq) explica diagnóstico, Redrive Policy e reenvio de mensagens com falha; ele não é pré-requisito para este fluxo.

Referências: [AWS — publicação no SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-publishing.html), [desduplicação FIFO](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html) e [Spring Cloud AWS 3.4.0 — SQS e confirmação de mensagens](https://docs.awspring.io/spring-cloud-aws/docs/3.4.0/reference/html/index.html).
