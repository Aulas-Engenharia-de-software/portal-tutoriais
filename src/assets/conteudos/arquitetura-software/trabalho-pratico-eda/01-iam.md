---
slug: "criando-iam"
title: "Usuário IAM e permissões de acesso"
description: "Prepare o acesso ao console e as credenciais do laboratório de eventos de pedidos."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Arquitetura Orientada a Eventos"
category: "Trabalho Prático"
type: "tutorial"
sequence: "trabalho-pratico-eda"
sequenceTitle: "Trabalho Prático — Arquitetura Orientada a Eventos"
step: 1
tags: ["aws", "iam", "permissoes", "eda"]
icon: "fab fa-aws"
readingMinutes: 12
updatedAt: "2026-10-23"
featured: true
order: 1
---

# Usuário IAM e permissões de acesso

## Objetivo da etapa

Preparar o acesso ao laboratório com um usuário IAM e guardar as credenciais que a aplicação usará. O trabalho completo seguirá a ordem **IAM → SNS → SQS → assinatura → consumer**.

![Fluxo de um evento de pedido efetuado: publicação no SNS e entrega à fila SQS](/images/aws-eventos/sns/fluxo-pedidos-efetuados.svg)

## Pré-requisitos

- Conta AWS do laboratório e uma identidade administradora autorizada a criar usuários IAM, configurar acesso ao console, anexar policies e criar chaves de acesso.
- Acesso ao console AWS. Nenhum tópico SNS ou fila SQS precisa existir ainda.
- Um local privado para guardar as credenciais, fora da pasta do projeto e do Git.

> **Sobre as imagens:** as capturas existentes mostram a localização dos campos, mas algumas ainda exibem nomes, contas ou permissões da versão anterior da aula. Siga os valores indicados no texto desta etapa.

## Passo a passo — Usuário, permissões e chave de acesso

O líder do grupo não deve compartilhar sua senha Root. Criaremos um usuário IAM específico para o time.

1. Pesquise por **IAM** na barra de pesquisa do console da AWS e vá em **Usuários** (*Users*).
2. Você deve encontrar uma tela conforme a seguinte:

![Imagem 1: Usuários](/images/aws-eventos/iam/usuarios.png)

3. Clique em **Criar usuário** (*Create user*).
4. Nome do usuário: `Grupo_Arquitetura_Software_AWS`.
   Habilite **Fornecer acesso do usuário ao Console de Gerenciamento da AWS**. Se o console perguntar o tipo de usuário, escolha **Desejo criar um usuário do IAM** para esta prática. Defina uma senha de acesso ao console e anote a URL de login da conta. Se houver exigência de troca no primeiro acesso, conclua-a ao entrar com o novo usuário.

![Imagem 2: Detalhes do usuário](/images/aws-eventos/iam/detalhes_usuario.png)

5. Escolha a opção **Anexar políticas diretamente** (*Attach policies directly*).

![Imagem 3: Anexar políticas diretamente](/images/aws-eventos/iam/anexar_politicas_diretamente.png)

6. Pesquise na caixa de texto e anexe as seguintes políticas:
   - `AmazonSQSFullAccess`
   - `AmazonSNSFullAccess`
7. No último passo, confira o nome e as duas policies, como na imagem abaixo, e clique em **Criar usuário**. Guarde a URL de login da conta e as informações de acesso ao console.

![Imagem 4: Revisão dos dados do usuário](/images/aws-eventos/iam/revisao_usuario.png)

> **Permissões para o laboratório:** se já fez a versão anterior, substitua `AmazonSNSReadOnlyAccess` por `AmazonSNSFullAccess`. São permissões amplas para esta prática; em produção, limite as ações e os recursos usados por cada aplicação.

8. Acesse o usuário que você acabou de criar: `Grupo_Arquitetura_Software_AWS`.
9. Abra a aba **Credenciais de segurança** (*Security credentials*) e, na seção **Chaves de acesso**, clique em **Criar chave de acesso** (*Create access key*). Faça essa criação usando a identidade administradora que está preparando o usuário: as policies de SNS e SQS não dão permissão para administrar usuários ou chaves IAM.

![Imagem 5: Criar chave de acesso](/images/aws-eventos/iam/criar_chave_acesso.png)

10. Escolha a opção **Código Local** (*Local code*), leia e confirme a recomendação exibida e avance. A chave será usada pelo consumer Java executado no computador.

![Imagem 6: Opção código local](/images/aws-eventos/iam/opcao_codigo_local.png)

11. Na opção **Definir etiqueta de descrição**, dê uma etiqueta como *Chave para consumo de eventos SQS*.

![Imagem 7: Etiqueta de descrição](/images/aws-eventos/iam/etiqueta_descricao.png)

12. **Faça o download do arquivo .csv com as credenciais criadas.**

![Imagem 8: Chave de acesso criada](/images/aws-eventos/iam/chave_acesso_criada.png)

> **Importante:** baixe o arquivo .csv. A Secret Key só é exibida uma vez!

## Entendendo os dois tipos de acesso

A **senha do usuário IAM** serve para entrar no console pelo navegador. A **Access Key ID** e a **Secret Access Key** do arquivo `.csv` autenticam a aplicação Java. A chave de acesso não substitui a senha do console.

As policies `AmazonSNSFullAccess` e `AmazonSQSFullAccess` serão usadas para criar e configurar os recursos do laboratório. A primeira permite gerenciar tópicos, assinaturas e publicar mensagens. A segunda permite criar filas, editar sua policy e receber/excluir mensagens. Elas não concedem administração do IAM.

Ainda não precisamos dos ARNs de SNS ou SQS. A autorização para o serviço SNS entregar mensagens à fila será configurada na etapa 4, depois de os dois recursos existirem.

> **Guarde as credenciais:** não publique o `.csv`, a senha ou as chaves no GitHub. Se perder a Secret Access Key, ela não poderá ser consultada novamente; peça ao administrador para criar uma substituta e desativar a antiga. Se alguma chave já foi exposta, removê-la do código não basta: ela precisa ser revogada/substituída.

## Como verificar a conclusão

1. Abra uma sessão separada do navegador e entre com o usuário IAM, a URL da conta e a senha criada. Assim você confirma o acesso que será utilizado nas próximas etapas.
2. Abra os serviços **SNS** e **SQS**. Confirme que consegue acessar a listagem de recursos. Se receber `Access denied`, peça ao administrador para revisar as duas policies e eventuais restrições da conta antes de continuar.
3. Confirme que o arquivo `.csv` foi salvo em local privado e contém a Access Key ID e a Secret Access Key do usuário correto. Não cole esses valores no tutorial nem no código.
4. Selecione **Norte da Virgínia (`us-east-1`)** no console para as próximas etapas. SNS, SQS e consumer usarão essa mesma região e conta; o IAM é global.

**Resultado esperado:** acesso ao console funcionando, permissões de SNS/SQS atribuídas e credenciais da aplicação guardadas.

Referência: [AWS — criação de usuários IAM e tipos de acesso](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

## Próxima etapa

Continue em [Etapa 2 — Criação do tópico SNS](/tutoriais/criando-sns).
