# CemexAssignement

## Installation

```bash
# Install dependencies
npm install
```

## Features

Implemented:

- Orders list presentation
- Filtration and search over orders list
- Added simulation of Http Request for more realistic feel
- Application is fully responsive

## Folder architecture

- features - for the smart/routed componenst (this folder could not exist like in my case with orders-list, because it's just single smart component)
- ui - for the smart components that make up the UI of the feature (directives and pipes can go here)
- data-access - for thigns like services
- utils - for helpers and utilities
- interfaces - types and interfaces
- shared forlder follows same logic but it exists to share functionality globally

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).
