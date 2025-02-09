# Backend docs

## Aplicación

El proyecto del backend se realizó con el framework Express.js con TypeScript para mayor seguridad en el tipado. El acceso a datos se hace mediante el ORM MikroORM a una base de datos MongoDB.

### Cómo instalar

1. Ir al directorio del proyecto: `cd Back-end App`.
2. Instalar las dependencias: `npm install`.
3. Crear los archivos .env.development con las variables propuestas por .env.example
4. Iniciar el servidor: `npm run start:dev`.

### Entornos

Los distintos entornos que maneja la aplicación son configurados con la librería dotenv.

- Desarrollo: variables en .env.development y comando `npm run start:dev` para iniciar.
- Producción: variables en .env.production y comando `npm run start:prod` para iniciar

### Autenticación y autorización

Se utilizó la libreria jsonwebtoken para crear los token y decodificarlos en cada request a los recursos protegidos. Los token son enviados a traves de una cookie al cliente.

### Swagger docs

En el endpoint `/api-docs` se encuentran documentados algunos de los endpoints de la api.

## Tests automatizados

Se utilizó el framework de testing Jest y la librería Supertest. Usar el comando `npm run test` para ejecutar los tests unitarios y de integración.
