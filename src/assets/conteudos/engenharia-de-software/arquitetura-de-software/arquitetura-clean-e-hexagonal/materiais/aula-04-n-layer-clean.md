---
slug: "aula-04-n-layer-clean"
title: "Aula 04 — Do N-Layer à arquitetura Clean"
description: "Parte das fragilidades das arquiteturas em camadas para introduzir Onion, Clean e Hexagonal, com foco em regra de dependência, domínio, portas, adaptadores e testabilidade."
course: "Engenharia de Software"
discipline: "Arquitetura de Software"
module: "Clean e Arquitetura Hexagonal"
category: "Aula 04"
type: "material"
resourceType: "slides"
externalUrl: "https://canva.link/s626cwmc7gjnpw8"
provider: "Canva · Lucas Martins"
tags: ["n-layer", "clean architecture", "hexagonal", "onion", "ports and adapters"]
icon: "fas fa-display"
readingMinutes: 22
updatedAt: "2026-08-09"
order: 113
---

# Aula 04 — Do N-Layer à arquitetura Clean

Arquiteturas em camadas ajudam a organizar responsabilidades, mas podem fazer o núcleo do sistema depender de detalhes que mudam com frequência. Clean, Onion e Hexagonal invertem essa relação: **o domínio passa a ocupar o centro e a tecnologia fica na borda**.

## O limite do N-Layer tradicional

Em um fluxo comum, Controller conhece Service, Service conhece Repository e Repository conhece o banco. Embora simples, essa direção pode transformar banco e framework na fundação da aplicação.

<figure class="concept-figure">
  <figcaption>Dependência tradicional: mudanças externas percorrem o sistema em direção ao negócio.</figcaption>
  <div class="diagram-flow">
    <div class="diagram-node"><strong>Controller</strong><span>Framework web</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Service</strong><span>Regras e orquestração</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node"><strong>Repository</strong><span>ORM</span></div>
    <span class="diagram-arrow">→</span>
    <div class="diagram-node danger-node"><strong>Banco</strong><span>Detalhe externo vira fundação</span></div>
  </div>
</figure>

Os sintomas mais comuns são:

- *sinkhole anti-pattern*, com camadas que apenas repassam dados;
- anotações do framework espalhadas até o domínio;
- Services que concentram toda a inteligência;
- testes que exigem banco, servidor ou infraestrutura real.

## A regra de dependência

Nas arquiteturas Clean, Onion e Hexagonal, dependências de código apontam para o centro. O núcleo conhece contratos, mas não precisa conhecer implementações externas.

<figure class="concept-figure">
  <figcaption>Esquema de dependência invertida: as bordas dependem do núcleo estável.</figcaption>
  <div class="diagram-rings">
    <div class="ring outer-ring"><span>Frameworks, banco, nuvem e interface</span>
      <div class="ring middle-ring"><span>Adaptadores e casos de uso</span>
        <div class="ring core-ring"><strong>Domínio</strong><small>Regras e invariantes</small></div>
      </div>
    </div>
  </div>
</figure>

Isso não elimina tecnologias externas. Apenas impede que elas ditem a forma das regras mais importantes.

## Onion Architecture

Onion enfatiza camadas concêntricas. O domínio fica no centro; aplicação, infraestrutura e interface o envolvem. Cada camada externa pode depender das internas, nunca o contrário.

## Clean Architecture

Clean Architecture organiza o sistema em Entities, Use Cases, Interface Adapters e Frameworks. O objetivo é obter:

- independência de frameworks;
- regras de negócio testáveis sem infraestrutura;
- interfaces substituíveis;
- mudanças tecnológicas localizadas.

## Arquitetura Hexagonal

A arquitetura Ports & Adapters enxerga a aplicação como um núcleo que se comunica por contratos.

- **Portas de entrada:** expõem casos de uso que podem ser acionados por REST, CLI, eventos ou testes.
- **Adaptadores de entrada:** traduzem uma tecnologia de entrada para a porta.
- **Portas de saída:** descrevem necessidades do núcleo, como salvar um pedido ou enviar uma notificação.
- **Adaptadores de saída:** implementam essas necessidades usando banco, fila ou API externa.

<figure class="concept-figure">
  <figcaption>Fluxo hexagonal: adaptadores se conectam ao núcleo por portas estáveis.</figcaption>
  <div class="hex-diagram">
    <div class="adapter-column">
      <div class="diagram-node"><strong>REST</strong><span>Adaptador de entrada</span></div>
      <div class="diagram-node"><strong>CLI / Teste</strong><span>Adaptador de entrada</span></div>
    </div>
    <div class="port-label">Portas<br>de entrada</div>
    <div class="hex-core"><strong>Aplicação</strong><span>Casos de uso</span><small>Domínio protegido</small></div>
    <div class="port-label">Portas<br>de saída</div>
    <div class="adapter-column">
      <div class="diagram-node"><strong>SQL / NoSQL</strong><span>Adaptador de saída</span></div>
      <div class="diagram-node"><strong>Fila / API</strong><span>Adaptador de saída</span></div>
    </div>
  </div>
</figure>

## Exemplo de inversão

O caso de uso precisa salvar um pedido. Em vez de importar diretamente um framework de banco, ele depende de `PedidoRepository`, uma interface definida perto da aplicação. Um adaptador externo implementa essa interface com JPA, DynamoDB ou outra tecnologia.

Assim, trocar o mecanismo de persistência não exige reescrever a regra de negócio.

## O trade-off

Mais isolamento significa mais contratos, mapeamentos e decisões de fronteira. Para um CRUD pequeno, essa estrutura pode ser excessiva. Ela entrega mais valor quando:

- o domínio possui regras relevantes;
- integrações mudam ou são numerosas;
- testes rápidos são essenciais;
- diferentes interfaces acionam os mesmos casos de uso;
- o sistema precisa sobreviver à troca de tecnologias.

## Verifique seu entendimento

1. Por que banco de dados é considerado um detalhe de implementação?
2. Qual é a diferença entre porta e adaptador?
3. Um Controller REST pertence ao núcleo? **Não.** Ele traduz HTTP para uma porta de entrada.
4. Quando a complexidade adicional não se justifica?

## Próximo passo

Até aqui, toda a organização ainda pode existir dentro de uma única implantação. A próxima aula amplia a escala para o sistema e para o time por meio de microsserviços.
