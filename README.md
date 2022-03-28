# Memoria

- Para empezar debemos instalar las librerias asociadas a este proyecto para ello ejecuta:

### `npm install`

- Después de instalar todas las librerias y dependencias, se debe ejecutar el proyecto con

### `npm start`

- Explicación:
  Para el tema de cambiar el lenguage se ha usado redux-saga. De forma que el idioma esta disponible en cualquier computo de la aplicación a traves del componente "I18n".
  Basta con añadir como paramtero text y el texto a traducir. Dicho texto debera existir en en dos ficheros json (en.json y es.json) que se encuentran en la carpeta pública en assets.

  La diseño aunuque simple se ha intentado que sea responsive.
  Se ha estructura en proyecto en varias carpetas con la idea de tener un css en cada componente que haya considerado oportuno que lo tenga.
  De igual manera de ha creado un directorio store para el tema de redux.

  En el directorio utils se ha creado un hook para controlar el tema del diseño responsive para la tabla de datos. De esta forma se actualiza cuando se cambia las diferentes resoluciones.

  Se ha intentado crear constantes usando enum de typescript.
  De la misma forma se ha tipado los datos de algunas de las respuesta del backend y propieades de los componentes.

- Librerias usadas:

  ### `react-router-dom`

  Para el tema de la navegación a traves de las rutas expuestas en App.tsx.

  ### `axios`

  Para gestionar el tema de peticiones (GET, POST, etc) en la api de breaking bad https://breakingbadapi.com/

  ### `typescritp`

  Para el tipado de datos.

  ### `material-ui`

  Para utilizar componentes definidos en esta libería para la maquetación del diseño web de la aplicación.
  Por ejemplo, Menu, Button, Table,etc.

  ### `lodash`

  Para utilizar funciones predefinidas para faciliarnos el trabajo como isEmpty para saber si un objeto esta vacio.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
