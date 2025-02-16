// Importación de dependencias y módulos
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { shopTypeRouter } from "./shopType/shopType.routes.js";
import { paymentTypeRouter } from "./paymentType/paymentType.routes.js";
import { productCategoryRouter } from "./productCategory/productCategory.routes.js";
import { commissionRouter } from "./commission/commission.routes.js";
import { userTypeRouter } from "./userType/userType.routes.js";
import { userRouter } from "./user/user.routes.js";
import { productRouter } from "./product/product.routes.js";
import { withdrawalRouter } from "./withdrawal/withdrawal.routes.js";
import { orderRouter } from "./order/order.routes.js";
import { shopRouter } from "./shop/shop.routes.js";
import { productVariationRouter } from "./productVariation/productVariation.routes.js";
import { reviewRouter } from "./review/review.routes.js";
import { RequestContext } from "@mikro-orm/core";
import { orm } from "./shared/orm.js";
import { serve, setup } from "swagger-ui-express";
import { swaggerSpec } from "./swaggerSpec.config.js";

// Función para configurar y obtener la aplicación Express
export function getApp() {
  const app = express(); // Crear una instancia de la aplicación Express

  app.use(cors()); // Configuración de CORS
  app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

  app.use(cookieParser()); // Middleware para manejar cookies

  // Middleware para crear un contexto de base de datos con MikroORM en cada solicitud
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  // Asociación de Routers con Rutas Base
  app.use("/api/shopTypes", shopTypeRouter);
  app.use("/api/paymentTypes", paymentTypeRouter);
  app.use("/api/productCategories", productCategoryRouter);
  app.use("/api/commissions", commissionRouter);
  app.use("/api/userTypes", userTypeRouter);
  app.use("/api/user", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/shops", shopRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/withdrawal", withdrawalRouter);
  app.use("/api/productVariations", productVariationRouter);
  app.use("/api/reviews", reviewRouter);

  // Middleware para servir la documentación de la API con Swagger UI
  app.use("/api-docs", serve, setup(swaggerSpec));

  // Middleware para manejar solicitudes a rutas no definidas (error 404)
  app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
  });

  // Retorna la aplicación Express configurada
  return app;
}
