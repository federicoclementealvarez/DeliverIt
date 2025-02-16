import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

/**
 * Clave secreta para firmar y verificar tokens JWT.
 * Se obtiene de las variables de entorno.
 */
export const secret = process.env.JWT_SECRET_KEY!;

/**
 * Interfaz extendida de `Request` para incluir el token decodificado.
 */
interface AuthenticatedRequest extends Request {
  token?: any;
}

/**
 * Enumeración de los tipos de usuario.
 */
export enum UserTypeEnum {
  client = "client",
  admin = "admin",
  delivery = "delivery",
  owner = "owner",
}

/**
 * Middleware para asegurar la autenticación y autorización de los roles del usuario.
 * - Verifica la presencia y validez del token JWT.
 * - Comprueba si el usuario tiene los roles necesarios para acceder al recurso.
 */
export function assureAuthAndRoles(roles: UserTypeEnum[]): RequestHandler {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization?.split(" ")[1]; // Obtiene el token del header

    if (!token) {
      return res.status(401).json({ message: "You are not Authenticated" }); // Si no hay token, devuelve un error 401
    }

    try {
      const decoded = jwt.verify(token, secret); // Verifica y decodifica el token
      req.token = decoded; // Almacena el token decodificado en la request

      if (roles.includes(req.token.userType.description)) {
        next(); // Si el usuario tiene el rol necesario, permite el acceso
      } else {
        return next(res.status(403).json({ message: "Not Authorized" })); // Si no, devuelve un error 403
      }
    } catch (error) {
      return res.status(403).json({ message: "Token is Not Valid" }); // Si el token no es válido, devuelve un error 403
    }
  };
}
