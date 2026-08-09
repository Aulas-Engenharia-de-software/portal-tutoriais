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

> Antes de começar, confirme que a fila SQS já existe e que sua aplicação utiliza uma versão compatível do Java e do Spring Boot.

## Fase 1 — Dependências do projeto

Adicione o starter do Spring Cloud AWS ao seu `pom.xml`. Ele contém as bibliotecas necessárias para utilizar o `@SqsListener`.

```xml
<dependency>
  <groupId>io.awspring.cloud</groupId>
  <artifactId>spring-cloud-aws-starter-sqs</artifactId>
</dependency>
```

Inclua também o gerenciamento de dependências para manter as versões do Spring Cloud e do SDK da AWS compatíveis:

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

Configure a região e o nome da fila no `src/main/resources/application.properties`. Mantenha as credenciais em variáveis de ambiente, nunca no repositório.

```properties
# Credenciais AWS vindas do ambiente
spring.cloud.aws.credentials.access-key=${AWS_ACCESS_KEY_ID}
spring.cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY}
spring.cloud.aws.region.static=us-east-1

# Nome da fila criada na AWS
queue.order-events=T0XN_SEU_NOME_PEDIDOS.fifo
```

> Segurança: consulte o tutorial de Variáveis de Ambiente deste portal antes de enviar o projeto ao GitHub.

## Fase 3 — Adapter de entrada

Crie uma classe responsável por ouvir a fila. Receba uma DTO compatível com o JSON publicado e delegue o processamento para uma porta da aplicação.

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

### Por que usar um adapter?

O adapter conhece o SQS e converte a entrada para uma chamada que a aplicação entende. A regra de negócio continua independente da AWS, facilitando testes e uma eventual troca da tecnologia de mensageria.

## Fase 4 — Teste e diagnóstico

1. Execute a aplicação com as variáveis de ambiente configuradas.
2. Publique uma mensagem na fila com os mesmos campos da sua DTO.
3. Confirme no log a mensagem `Mensagem recebida`.
4. Verifique o efeito esperado no banco de dados ou no próximo passo do fluxo.

Se a desserialização falhar, confira se os nomes dos atributos da DTO correspondem ao JSON. Quando forem diferentes, use `@JsonProperty` do Jackson para fazer o mapeamento explícito.

> Pronto para testar: quando o log de sucesso aparecer, o adapter está conectado e a mensagem chegou até sua regra de negócio.
