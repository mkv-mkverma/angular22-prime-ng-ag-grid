---
name: new-prime-ag-project
description: Scaffold a new Angular + PrimeNG + AG Grid Enterprise project (the stack used in angular22-prime-ng-ag-grid), including optional dev tooling (husky, json-server, source-map-explorer) and Vitest coverage. Use when the user asks to start/bootstrap a new Angular project with PrimeNG and/or AG Grid.
---

# New Angular + PrimeNG + AG Grid project

Recreates the setup used for this project (`angular22-prime-ng-ag-grid`): Angular 22 +
PrimeNG 22 + AG Grid Enterprise 36, with optional linting/git-hooks/mock-API tooling.

Run each step, checking the command's output before moving to the next — don't batch
these blindly, since a failed `ng new` or install should stop the sequence.

## 1. Scaffold the Angular app

```bash
ng new <project_name>
```

Answer the CLI prompts (stylesheet format, SSR, etc.) per the user's preference if asked;
otherwise use Angular CLI defaults.

## 2. Install PrimeNG + AG Grid

```bash
cd <project_name>
npm install primeng@22.1.0 primeicons
npm install ag-grid-angular@36.1.0 ag-grid-community@36.1.0 ag-grid-enterprise@36.1.0
```

Pin these exact versions unless the user asks for latest — they're the combination
verified to work together for this stack.

## 3. Verify installed versions

```bash
npm list @angular/core
npm list primeng
npm list ag-grid-angular
npm list ag-grid-community
npm list ag-grid-enterprise
ng version
```

Expected baseline: **Angular 22.1.4 + PrimeNG 22.1.0 + AG Grid Enterprise 36.1.0**.

## 4. Optional dev tooling (lint, git hooks, mock API, bundle analysis)

```bash
npm install --save-dev husky json-server source-map-explorer
ng lint
npx husky init
```

`ng lint` requires `angular-eslint` to be set up (run `ng add @angular-eslint/schematics`
first if the project doesn't already have an `eslint.config.js`). After `npx husky init`,
wire up hooks like this project's:
- `pre-commit` → `npm run lint`
- `pre-push` → `npm test && npm run lint`

`json-server` is meant to serve a local mock API (e.g. `json-server src/assets/db.json`)
paired with a dev-environment `apiUrl` pointing at `http://localhost:3000`.

`source-map-explorer` is for bundle analysis after a production build:
```bash
npm run build
npx source-map-explorer "dist/<project_name>/browser/*.js" --no-border-checks
```

## 5. Optional: Vitest coverage

Angular 22's default test builder is Vitest-based. To enable coverage reporting:

```bash
npm i -D @vitest/coverage-v8@4.0.8
```

Then run tests with `--coverage`, e.g. `ng test --watch=false --coverage`.

## 6. Wire up npm scripts

Add convenience scripts to `package.json` (adjust the `analyze` path to the project name):

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test --watch=false",
    "test:watch": "ng test",
    "test:coverage": "ng test --watch=false --coverage",
    "lint": "ng lint",
    "mock-api": "json-server src/assets/db.json",
    "analyze": "source-map-explorer \"dist/<project_name>/browser/*.js\" --no-border-checks",
    "prepare": "husky"
  }
}
```

## 7. Wire up PrimeNG and AG Grid in the app

Neither library self-configures — after install, still need to:
- Call `providePrimeNG(...)` (with a theme preset) in `app.config.ts`.
- Import `AgGridAngular` in whatever standalone component renders a grid, and register
  AG Grid Enterprise modules/license per the current `ag-grid-angular` v36 standalone
  setup docs (module registration API changes between major versions — don't assume an
  older pattern still applies).

Check each library's current Angular 22 / standalone-components docs rather than
assuming legacy NgModule-based wiring, since neither is used elsewhere in a fresh scaffold.
