# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                 # ng serve — dev server at http://localhost:4200 (development config)
npm run build              # ng build — production build to dist/angular22-prime-ng-ag-grid (sourceMap enabled)
npm run watch               # ng build --watch --configuration development
npm test                    # ng test --watch=false — run unit tests once (Vitest)
npm run test:watch          # ng test — Vitest in watch mode
npm run test:coverage       # ng test --watch=false --coverage — requires @vitest/coverage-v8 (already a devDependency)
npm run lint                 # ng lint (angular-eslint via eslint.config.js)
npm run analyze              # source-map-explorer against dist/**/*.js — run `npm run build` first, it does not build itself
npm run mock-api             # json-server src/assets/db.json — serves the mock users API used by environment.development.ts's commented-out localhost apiUrl
```

To run a single test file, pass the path through to the underlying Vitest run, e.g.:
```bash
npx vitest run src/app/app.spec.ts
```

There is no e2e test setup.

### Git hooks (Husky)
- `pre-commit`: `npm run lint`
- `pre-push`: `npm test` then `npm run lint`

Both must pass locally before code can be committed/pushed.

## Architecture

This is a standalone-components Angular 22 app (no NgModules) bootstrapped from [src/main.ts](src/main.ts) via `bootstrapApplication(App, appConfig)`.

- **App shell**: [src/app/app.ts](src/app/app.ts) is the root `App` component (selector `app-root`), rendering only `<router-outlet />` ([src/app/app.html](src/app/app.html)).
- **App-wide providers**: [src/app/app.config.ts](src/app/app.config.ts) — `provideBrowserGlobalErrorListeners()` and `provideRouter(routes)`.
- **Routes**: [src/app/app.routes.ts](src/app/app.routes.ts) is currently empty (`routes: Routes = []`) — this is the entry point for adding feature routes.
- **Environments**: [src/environments/environment.ts](src/environments/environment.ts) (production) and [environment.development.ts](src/environments/environment.development.ts) each export an `apiUrl`. Production/default points at `https://jsonplaceholder.typicode.com`; the dev file has a commented-out `http://localhost:3000` alternative meant to pair with `npm run mock-api` (json-server serving [src/assets/db.json](src/assets/db.json)).
- **Build system**: uses the new `@angular/build:application` (esbuild-based) builder and `@angular/build:unit-test` (Vitest-based) test builder — not the legacy Karma/webpack builders. Angular CLI config lives in [angular.json](angular.json); the `production` build configuration is the default (`defaultConfiguration`) for `ng build`.

### Key dependencies (installed, not yet wired into the app)
- `ag-grid-angular` / `ag-grid-community` / `ag-grid-enterprise` — grid component, per the project name, not yet used in any component.
- `primeng` / `primeicons` — UI component library, not yet imported/configured (no `providePrimeNG` call yet in app.config.ts).

When adding grid or PrimeNG features, this is greenfield — there's no existing usage pattern in the codebase to follow yet, so check each library's current Angular 22 / standalone-components setup docs rather than assuming legacy module-based wiring.

## Code style

- Prettier: 100 char print width, single quotes, `.html` files parsed with the `angular` parser ([.prettierrc](.prettierrc)).
- ESLint ([eslint.config.js](eslint.config.js)): `@eslint/js` + `typescript-eslint` (recommended + stylistic) + `angular-eslint` (`tsRecommended` for `.ts`, `templateRecommended` + `templateAccessibility` for `.html`). Enforces `app` prefix on components (kebab-case selector) and directives (camelCase selector).
