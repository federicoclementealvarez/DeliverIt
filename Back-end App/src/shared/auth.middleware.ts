import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET_KEY!;

interface AuthenticatedRequest extends Request {
  token?: any;
}

export enum UserTypeEnum {
  client = 'client',
  admin = 'admin',
  delivery = 'delivery',
  owner = 'owner',
}

export function assureAuthAndRoles(roles: UserTypeEnum[]): RequestHandler {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'You are not Authenticated' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.token = decoded;

      if (roles.includes(req.token.userType.description)) {
        next();
      } else {
        return next(res.status(403).json({ message: 'Not Authorized' }));
      }
    } catch (error) {
      return res.status(403).json({ message: 'Token is Not Valid' });
    }
  };
}
