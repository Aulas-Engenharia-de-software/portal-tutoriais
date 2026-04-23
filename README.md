# Portal de Tutoriais

Aplicação Angular (standalone components) com Tailwind voltada para tutoriais/laboratórios. Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) v21.2.7 e usa o Vitest como test runner integrado do Angular.

## Requisitos
- Node.js 20+
- npm 10+
- Angular CLI 21+

## Instalação
```bash
npm install
```

## Servidor de desenvolvimento
Inicie o servidor local com hot‑reload:
```bash
ng serve
```
Depois abra `http://localhost:4200/` no navegador.

## Build (produção)
Gere o build otimizado em `dist/`:
```bash
ng build
```

## Testes unitários (Vitest)
Este projeto possui testes unitários cobrindo todos os componentes. Para executar:
```bash
ng test
```
Executar os testes uma única vez (sem watch):
```bash
ng test --watch=false
```
Gerar relatório de cobertura (coverage):
```bash
ng test --code-coverage
```
O relatório ficará em `coverage/portal-tutoriais/index.html`.

### Componentes cobertos por testes
- `AppComponent`
  - Criação do componente
  - Alternância do menu lateral mobile e efeitos no `document.body.style.overflow`
  - Fechamento condicional no mobile via `closeMobileSidebar()`
  - Alternância independente dos submenus AWS e SQS
- `HomeComponent`
  - Renderização do título "Portal do Aluno"
  - Presença dos dois cartões com `routerLink` (AWS EDA e Consumer SQS)
- `TutorialAwsComponent`
  - Abertura/fechamento do lightbox com atualização do `overflow` do `body`
  - Lógica de cópia para área de transferência com feedback visual temporário
- `TutorialConsumerSqsComponent`
  - Lógica de cópia para área de transferência
  - Variações de feedback: botão mobile (com `<span>`) e botão padrão (apenas ícone)

### Dicas para escrever novos testes
- Componentes standalone: importe o próprio componente em `imports: [MeuComponente]` do `TestBed`.
- Rotas/`routerLink`: utilize `RouterTestingModule` quando necessário.
- Mocks do Clipboard API:
  ```ts
  (navigator as any).clipboard = { writeText: () => Promise.resolve() };
  ```
- Testes com `setTimeout`/promessas: use `fakeAsync`, `flushMicrotasks()` e `tick(tempo)` para avançar o tempo virtual.
- Simular tamanhos de tela em testes:
  ```ts
  const original = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
  // ...teste...
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: original });
  ```

## Gerar novos artefatos via CLI
Crie um novo componente:
```bash
ng generate component nome-do-componente
```
Outros schematics disponíveis:
```bash
ng generate --help
```

## E2E (opcional)
Este projeto não inclui framework de e2e por padrão. Você pode adicionar Cypress/Playwright conforme necessidade.

## Recursos
- Documentação do Angular CLI: https://angular.dev/tools/cli
- Vitest: https://vitest.dev/
