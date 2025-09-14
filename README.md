# Exchange Rate App

La aplicación está construida sobre la herramienta Vite. Para iniciarla localmente se deben seguir los siguientes pasos:

## 1. Clonar el repositorio usando git

```
git clone https://github.com/eduardopomajulca/ExchangeRateApp.git
```

## 2. Instalar las dependencias del proyecto

Ir a la carpeta raíz del proyecto y ejecutar el siguiente comando:
```
npm install
```

## 3. Agregar el archivo con las variables de entorno

Dentro de la carpeta src se debe agregar el archivo .env con la siguiente variable y el valor correspondiente del API Key para la conexión con Firebase (en Netlify se manejan secrets para almacenar esta información):

```
VITE_GOOGLE_API_KEY
```

## 4. Ejecutar la aplicación

Dentro de la misma carpeta ejecutar el siguiente comando:
```
npm run dev
```

La línea de comandos devolverá el link local (Por default http://localhost:5173/) con el cual se podrá visualizar el sistema.

## Anotaciones

Se debe contar con git, node y npm instalados.

Versiones:

| Herramienta | Versión |
|:-----|:---:|
| node | 22.15.1 |
| npm | 10.9.2 |

## Link de la aplicación desplegada en Netlify

https://epl-exchangerateapp.netlify.app/
