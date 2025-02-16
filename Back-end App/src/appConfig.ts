// Importación de dependencias y módulos
import express from "express"; // Framework de Node.js para crear el servidor web
import cors from "cors"; // Middleware para habilitar CORS
import cookieParser from "cookie-parser"; // Middleware para manejar cookies
import { shopTypeRouter } from "./shopType/shopType.routes.js"; // Router para shopType
import { paymentTypeRouter } from "./paymentType/paymentType.routes.js"; // Router para paymentType
import { productCategoryRouter } from "./productCategory/productCategory.routes.js"; // Router para productCategory
import { commissionRouter } from "./commission/commission.routes.js"; // Router para commission;
import { userTypeRouter } from "./userType/userType.routes.js"; // Router para userType
import { userRouter } from "./user/user.routes.js"; // Router para user
import { productRouter } from "./product/product.routes.js"; // Router para product
import { withdrawalRouter } from "./withdrawal/withdrawal.routes.js"; // Router para withdrawal
import { orderRouter } from "./order/order.routes.js"; // Router para order
import { shopRouter } from "./shop/shop.routes.js"; // Router para shop
import { productVariationRouter } from "./productVariation/productVariation.routes.js"; // Router para productVariations
import { reviewRouter } from "./review/review.routes.js"; // Router para review
import { RequestContext } from "@mikro-orm/core"; // Contexto de base de datos para MikroORM
import { orm } from "./shared/orm.js"; // Instancia de MikroORM para manejo de la base de datos
import { serve, setup } from "swagger-ui-express"; // Middleware para servir la interfaz de Swagger
import { swaggerSpec } from "./swaggerSpec.config.js"; // Configuración de Swagger para la documentación de la API

// Verificación del entorno de producción
export const isProduction = process.env.NODE_ENV === "production";

// Función para configurar y obtener la aplicación Express
export function getApp() {
  const app = express(); // Crear una instancia de la aplicación Express

  // Orígenes permitidos para CORS
  const allowedOrigins = [
    "http://localhost:4200",
    "https://deliverit.vercel.app",
  ];

  // Configuración de CORS
  app.use(
    cors({
      origin: allowedOrigins, // Orígenes permitidos
      credentials: true, // Habilitar el envío de credenciales (cookies, tokens, etc.)
    })
  );
  app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON
  app.use(cookieParser()); // Middleware para manejar cookies

  // Middleware para crear un contexto de base de datos con MikroORM en cada solicitud
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  // Asociación de routers con rutas base
  app.use("/api/shopTypes", shopTypeRouter); //Rutas para shopTypes
  app.use("/api/paymentTypes", paymentTypeRouter); //Rutas para paymentTypes
  app.use("/api/productCategories", productCategoryRouter); //Rutas para productCategories
  app.use("/api/commissions", commissionRouter); //Rutas para comissions
  app.use("/api/userTypes", userTypeRouter); //Rutas para userTypes
  app.use("/api/user", userRouter); //Rutas para user
  app.use("/api/products", productRouter); //Rutas para products
  app.use("/api/shops", shopRouter); //Rutas para shops
  app.use("/api/order", orderRouter); //Rutas para order
  app.use("/api/withdrawal", withdrawalRouter); //rutas para withdrawal
  app.use("/api/productVariations", productVariationRouter); //rutas para productVariations
  app.use("/api/reviews", reviewRouter); //rutas para reviews

  // Middleware para servir la documentación de la API con Swagger UI
  app.use("/api-docs", serve, setup(swaggerSpec));

  // Middleware para manejar solicitudes a rutas no definidas (error 404)
  app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
  });

  // Retorna la aplicación Express configurada
  return app;
}
