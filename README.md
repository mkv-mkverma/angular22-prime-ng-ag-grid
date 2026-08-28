# Angular22PrimeNgAgGrid

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.2.

**Stack:** Angular 22.1.4 + PrimeNG 22.1.0 + AG Grid Enterprise 36.1.0

## Project setup (quick reference)

How this project was bootstrapped, kept here for spinning up a similar project again.
The same steps are packaged as a reusable Claude Code skill at
[.claude/skills/new-prime-ag-project/SKILL.md](.claude/skills/new-prime-ag-project/SKILL.md).

```bash
ng new project_name

npm install primeng@22.1.0 primeicons
npm install ag-grid-angular@36.1.0 ag-grid-community@36.1.0 ag-grid-enterprise@36.1.0

# verify versions
npm list angular
npm list primeng
npm list ag-grid-angular
npm list ag-grid-community
npm list ag-grid-enterprise
ng version
```

### Optional dev tooling

```bash
npm install --save-dev husky json-server source-map-explorer

ng lint
npx husky init
```

### Test coverage

```bash
npm i -D @vitest/coverage-v8@4.0.8
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
