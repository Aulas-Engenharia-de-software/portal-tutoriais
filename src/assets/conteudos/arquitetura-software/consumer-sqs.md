---
slug: "consumer-sqs"
title: "Configurando um Consumer SQS com Spring Boot"
description: "Conecte uma aplicação Java à AWS SQS mantendo a mensageria isolada da regra de negócio por meio de adapters."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Java e AWS"
type: "tutorial"
tags: ["java", "spring boot", "aws", "sqs", "hexagonal", "adapter"]
icon: "fas fa-stream"
readingMinutes: 10
updatedAt: "2026-08-08"
featured: true
order: 2
---

# Configurando o Consumer SQS

Agora que a infraestrutura na AWS está pronta, vamos conectar a aplicação Java/Spring ao barramento de eventos. O listener será implementado como um **adapter**, mantendo a tecnologia da fila separada da regra de negócio.

## Fase 1 — Dependências do projeto

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

## Fase 2 — Credenciais e fila

1. Configure a região e o nome da fila no `src/main/resources/application.properties`, usando as credenciais obtidas no arquivo .csv da primeira fase do tutorial de EDA.

> **Segurança:** mantenha as credenciais em variáveis de ambiente, nunca no repositório. Consulte o tutorial de Variáveis de Ambiente antes de enviar o projeto ao GitHub.

```properties
# Credenciais AWS vindas do ambiente
spring.cloud.aws.credentials.access-key=${AWS_ACCESS_KEY_ID}
spring.cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY}
spring.cloud.aws.region.static=us-east-1

# Nome da fila criada na AWS
queue.order-events=pedidos-efetuados-processamento.fifo
```

## Fase 3 — Adapter de entrada

1. Crie uma classe responsável por ouvir a fila. Receba uma DTO compatível com o JSON publicado e delegue o processamento para uma porta da aplicação.

```java
@Component
public class SqsPedidoAdapter {

    private final PedidoServicePort pedidoServicePort;

    public SqsPedidoAdapter(PedidoServicePort pedidoServicePort) {
        this.pedidoServicePort = pedidoServicePort;
    }

    @SqsListener("${queue.order-events}")
    public void listen(SuaDTO dto) {
        System.out.println("Mensagem recebida: " + dto.getCustomerId());
        pedidoServicePort.process(dto);
        System.out.println("Mensagem consumida com sucesso.");
    }
}
```

> **Dica:** confira se os nomes dos atributos da DTO correspondem ao JSON de pedido publicado no seu SNS, conforme o teste do [tutorial de EDA](/tutoriais/aws-eda). Quando forem diferentes, use `@JsonProperty` do Jackson para fazer o mapeamento explícito.

## Pronto para testar!

Execute a aplicação com as variáveis de ambiente configuradas e aguarde o log `Mensagem recebida`. Verifique se o pedido foi processado e gravado no banco de dados.
