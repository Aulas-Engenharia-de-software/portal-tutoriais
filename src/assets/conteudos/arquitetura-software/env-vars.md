---
slug: "env-vars"
title: "Variáveis de Ambiente: ocultando credenciais AWS na IDE"
description: "Guia para manter AWS Access Key e Secret Key fora do código usando variáveis de ambiente no IntelliJ e no VS Code."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Boas Práticas"
type: "tutorial"
tags: ["aws", "seguranca", "variaveis de ambiente", "intellij", "vscode"]
icon: "fas fa-key"
readingMinutes: 8
updatedAt: "2026-08-08"
order: 3
---

# Proteja suas credenciais AWS

Subir suas chaves da AWS (Access Key e Secret Key) no GitHub é uma vulnerabilidade crítica. Bots escaneiam repositórios públicos em segundos para sequestrar contas. Além disso, a própria AWS pode detectar chaves expostas e bloqueá‑las imediatamente.

> Atenção: nunca commit suas chaves reais. Use variáveis de ambiente durante o desenvolvimento e soluções seguras (ex.: IAM Roles, Secrets Manager) em ambientes de nuvem.

## Application.properties

Em vez de colocar as chaves diretamente no arquivo, informe ao Spring Boot para buscá‑las do ambiente no momento da execução.

```properties
# Credenciais AWS Dinâmicas
spring.cloud.aws.credentials.access-key=${AWS_ACCESS_KEY_ID}
spring.cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY}
spring.cloud.aws.region.static=us-east-1

# Filas
queue.order-events=T0XN_SEU_NOME_PEDIDOS.fifo
```

Apague qualquer valor real do seu `application.properties`. O formato `${VARIAVEL}` indica ao Spring que o valor virá do ambiente da execução.

Para configurar rapidamente as variáveis em um único campo (IntelliJ), use:

```text
AWS_ACCESS_KEY_ID=sua_access_key;AWS_SECRET_ACCESS_KEY=sua_secret_key
```

## IntelliJ IDEA

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

4. Ao final, sua configuração de execução deve ficar assim. Clique em "Apply" e depois em "OK".

![Imagem 4: Variáveis de ambiente configuradas na execução do IntelliJ](/images/env-vars/intellij/env_vars_configured.png)

## VS Code

Se você usa o Visual Studio Code com a extensão Java, as configurações ficam no arquivo `launch.json`.

1. Abra a barra lateral de execução (Run and Debug) e clique na engrenagem para abrir o `launch.json`.

![Imagem 1: Abrindo o arquivo launch.json no VS Code para configurar a execução e depuração](/images/env-vars/vscode/vscode_open_launch.png)

2. Caso a tela de criação apareça, escolha criar o `launch.json`.

![Imagem 2: Criando o arquivo launch.json para configurar a execução e depuração no VS Code](/images/env-vars/vscode/vscode_run_debug_config.png)

3. Se tiver as extensões Java instaladas, selecione a opção de Java.

![Imagem 3: Escolhendo a extensão Java Extension Pack no VS Code para configurar o ambiente de desenvolvimento Java](/images/env-vars/vscode/vscode_choose_java.png)

4. Dentro da sua configuração atual, adicione a propriedade `env` com suas chaves reais, conforme o exemplo abaixo:

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

## Aplicação Blindada!

Pronto! Agora você pode executar sua aplicação com segurança: as chaves da AWS serão injetadas automaticamente em tempo de execução, mantendo seu código seguro e suas credenciais fora do repositório.
