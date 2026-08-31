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

| Feature                    | Community | Enterprise |
| -------------------------- | --------- | ---------- |
| Basic grid                 | ✅        | ✅         |
| Sorting                    | ✅        | ✅         |
| Filtering                  | ✅        | ✅         |
| Pagination                 | ✅        | ✅         |
| Column resize/move/pin     | ✅        | ✅         |
| Custom cell renderer       | ✅        | ✅         |
| Custom themes              | ✅        | ✅         |
| Virtual scrolling          | ✅        | ✅         |
| Client-Side Row Model      | ✅        | ✅         |
| **Server-Side Row Model**  | ❌        | ✅         |
| **Infinite Row Model**     | ❌        | ✅         |
| **Row Grouping**           | ❌        | ✅         |
| **Pivoting**               | ❌        | ✅         |
| **Aggregation**            | ❌        | ✅         |
| **Excel Export**           | ❌        | ✅         |
| **Range Selection**        | ❌        | ✅         |
| **Master/Detail**          | ❌        | ✅         |
| **Side Bar / Tool Panels** | ❌        | ✅         |
| **Integrated Charts**      | ❌        | ✅         |
| Advanced Clipboard         | ❌        | ✅         |
| Enterprise support         | ❌        | ✅         |

rowModelType defaults to clientSide.

- rowModelType="clientSide"
- [rowData]="rowData"

* rowModelType="serverSide"
* [serverSideDatasource]="serverSideDatasource"

SSRM is AG Grid's server-side row model. It loads data in blocks from the server instead of loading the complete dataset into the browser. AG Grid manages the block lifecycle, caching, refreshing, and coordinates server-side operations such as sorting, filtering, grouping and aggregation. Pagination can also be enabled when required.

SSRM pagination with a server-side data source and cached blocks.

The default cacheBlockSize is:

```
Simple table
     ↓
PrimeNG Table
     ↓
Basic CRUD / pagination / sorting / filtering


Complex data grid
     ↓
AG Grid
     ↓
Virtualisation
SSRM
Infinite loading
Server-side sorting/filtering
Grouping
Aggregation
Selection
Excel export
Caching
Advanced configuration
```

In CSRM, the complete dataset is loaded into the browser and AG Grid performs operations such as sorting, filtering, pagination, grouping and aggregation on the client. In SSRM, the dataset remains on the server and AG Grid requests blocks of data as needed, with operations such as sorting and filtering delegated to the server. I would use CSRM for small to medium datasets and SSRM when the dataset is very large or server-side processing is required.

```
CSRM
 ↓
WHO OWNS THE DATA?
Browser


SSRM
 ↓
WHO OWNS THE DATA?
Server


Virtualization
 ↓
HOW MANY ROWS ARE IN THE DOM?
Only what's needed for rendering
```

filter
Text column
↓
agTextColumnFilter

Number column
↓
agNumberColumnFilter

CSRM is suitable when the complete dataset can reasonably be loaded into the browser. The data is kept in client memory and sorting, filtering and other operations can be performed on the client.

Infinite Row Model is useful for large flat datasets where I don't want to load everything at once. AG Grid requests data in blocks as the user scrolls.

SSRM is suitable for very large datasets. The server owns the dataset and AG Grid requests blocks of data. Operations like filtering, sorting, grouping and aggregation can be delegated to the server.

So I would choose based on dataset size and where I want the data operations to happen — client or server.

For this API, I'd choose Infinite Row Model if it's a simple flat dataset and the main requirement is loading paginated data as the user scrolls. If the requirement includes server-side grouping, aggregation, pivoting, or more complex server-side filtering/sorting, I'd choose SSRM

If the API already provides server-side pagination and the UI requires explicit pages, I would use AG Grid pagination with SSRM. AG Grid would request the required block/page from the server instead of loading all 10,000 records into the browser.

Pagination controls how much data is shown or requested at a time, usually as explicit pages. Virtual scrolling controls how many DOM rows are rendered at once while the user scrolls.

For example, with 100 records, pagination might show 10 records per page. Virtual scrolling could keep all 100 records in the client but render only the rows currently visible in the viewport.

I don't necessarily need both. If pagination already limits the page to 10–20 rows, virtual scrolling usually provides little benefit. Virtual scrolling becomes useful when I have a larger set of client-side data that needs to be scrolled through without putting every row into the DOM.

In SSRM, AG Grid doesn't perform the server-side sorting or filtering itself. It provides the sortModel and filterModel through params.request, and I send those to the backend so the server/database performs the operation.