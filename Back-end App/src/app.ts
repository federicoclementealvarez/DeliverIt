// Importación de dependencias
import dotenv from "dotenv"; // Para cargar variables de entorno desde un archivo .env
import { getApp } from "./appConfig.js"; // Importar la función getApp para obtener la aplicación configurada

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Obtener la aplicación Express configurada
const app = getApp();

// Escuchar el puerto de la API y mostrar un mensaje en consola con la dirección del servidor
app.listen(process.env.API_PORT, () => {
  console.log(
    `Server running on ${process.env.API_SERVER}:${process.env.API_PORT}`
  );
});
