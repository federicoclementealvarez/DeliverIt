import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";

/**
 * Configuración y inicialización de MikroORM para la conexión a la base de datos MongoDB.
 *
 * - `entities`: Especifica las rutas de las entidades compiladas (archivos `.js`).
 * - `entitiesTs`: Especifica las rutas de las entidades en TypeScript (archivos `.ts`).
 * - `dbName`: Nombre de la base de datos a la que se conectará.
 * - `type`: Tipo de base de datos (en este caso, MongoDB).
 * - `clientUrl`: URL de conexión a la base de datos, obtenida de las variables de entorno.
 * - `highlighter`: Resaltador de consultas para MongoDB (útil en modo debug).
 * - `debug`: Habilita el modo debug para ver las consultas SQL generadas.
 */

export const orm = await MikroORM.init({
  entities: ["dist/**/*.entity.js", "dist/**/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: "deliver_it",
  type: "mongo",
  clientUrl: process.env.DB_URL,
  highlighter: new MongoHighlighter(),
  debug: true,
});
