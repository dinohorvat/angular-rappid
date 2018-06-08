# JointJS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Dependencies:
npm install lodash --save
npm install backbone --save


Include in angular.json:
    **    "lodash": "^3.10.1" **
    <!-- Rappid/JointJS dependencies: -->
    `npm i jquery --save` `npm install @types/jquery --save-dev`
    `npm i backbone --save` `npm install @types/backbone --save-dev`
    `npm install jointjs --save npm install @types/jointjs --save-dev`
    `npm i lodash --save` `npm install @types/lodash --save-dev`
   
    `"styles": [
          "src/styles.css",
           "src/vendor/css/rappid.css"
      ],
      "scripts": [
           "node_modules/jquery/dist/jquery.js",
           "node_modules/lodash/index.js",
           "node_modules/backbone/backbone-min.js",
            "src/vendor/js/rappid.js"
      ]`

