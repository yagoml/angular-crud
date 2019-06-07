## Angular CRUD (PT-BR)
CRUD básico desenvolvido para testes com o framework Angular 7.

Armazenamento no localstorage.

Possui sistema de cache dos dados da API de veículos.

## Manual do Usuário

### Base de Clientes
Aqui é mostrado em tabela os clientes cadastrados na base.

### Novo Cliente
Formulário para adicionar cliente.
Para adicionar, clicar no link `Novo Cliente` ao lado do título `Base de Clientes`.
Para voltar à Base de Clientes (página inicial), clicar no título `Base de Clientes`, ou no botão `Cancelar`.
Caso existam dados inválidos ou não preenchido, será alertado abaixo de cada campo inválido.

### Editar Cliente
Formulário de edição de cliente cadastrado.
Para editar, clicar no link `Editar`, que fica na coluna `Ações`, na sua respectiva linha da tabela.
Para voltar à Base de Clientes (página inicial), clicar no título `Base de Clientes`, ou no botão `Cancelar`.
Caso existam dados inválidos ou não preenchido, será alertado abaixo de cada campo inválido.

### Excluir Cliente
Para excluir um cliente, clicar no link `Excluir`, que fica na coluna `Ações`, na sua respectiva linha da tabela, confirmar a exclusão apertando `OK` no popup de confirmação.

_________________________________________________________________________________________________________

## Angular CRUD (EN-US)
Simple CRUD developed with the Angular framework 7.
Storage in localstorage.
Features vehicle API Data Cache System

## User manual

### Customer Base
Here the clients registered in the database are shown in the table.

### New customer
Form to add client.
To add, click the `Novo Cliente` link next to the `Base de Clientes` heading.
To return to the Client Base (home page) click on the heading `Base de Clientes` or the `Cancelar` button.
If there is invalid or unfilled data, you will be alerted below each invalid field.

### Edit Client
Registered customer registration form.
To edit, click on the `Editar` link, which is in the `Ações` column, in its respective row of the table.
To return to the Client Base (home page) click on the heading `Base de Clientes` or the `Cancelar` button.
If there is invalid or unfilled data, you will be alerted below each invalid field.

### Delete Customer
To delete a client, click on the `Excluir` link in the `Ações` column in its table row, confirm the deletion by pressing `OK` in the confirmation popup.

_________________________________________________________________________________________________________

# Project Inicialization

1. Go to project folder and install dependencies:

```bash
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```bash
npm start
```

## Project structure

```
dist/                        compiled version
documentation/               generated document source
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app.routing.ts         app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- index.html                html entry point
|- styles.css                global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
```

## Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                   | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| npm start               | Run development server on `http://localhost:4200/`                                |
| npm run build:dev       | Lint code and build app for development env in `dist/` folder                     |
| npm run build:prod      | Lint code and build app for production env in `dist/` folder                      |
| npm run build:local     | Lint code and build app for local env in `dist/` folder                           |
| npm run pwa:build:dev   | Lint code and build PWA app for development env in `dist/` folder                 |
| npm run pwa:build:prod  | Lint code and build PWA app for production env in `dist/` folder                  |
| npm run pwa:build:local | Lint code and build PWA app for local env in `dist/` folder                       |
| npm run lint            | Lint code                                                                         |
| npm run compodoc:gen    | Generate Project document in ./documentation folder                               |
| npm run compodoc:serve  | You can access ./documentation folder via `http://localhost:8080`                 |
| npm run compodoc        | It generate latest ./documentation and you can access via `http://localhost:8080` |

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

### Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

### PWA Service worker support

To enalbe service worker go to `src/main.ts` and uncomment service worker code.