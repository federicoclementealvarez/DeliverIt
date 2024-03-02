import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { secret } from './secretKey.js';
//export const verifyToken = {}
//
// Extiende la interfaz Request para incluir la propiedad 'user'
interface AuthenticatedRequest extends Request {
  token: any //string | JwtPayload; // Puedes ajustar el tipo según la estructura de tu usuario
}


export async function verifyToken(req: Request, res: Response, next: NextFunction)
{
  const token = req.cookies.access_token
  if(!token) {return res.status(401).json({message:'You are not Authenticated'})}
  try {
    const decoded = jwt.verify(token, secret);
    (req as AuthenticatedRequest).token = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({message:'Token is Not Valid'})
  }
}


export async function verifyClient(req: Request, res: Response, next: NextFunction)
{
  await verifyToken(req, res, async ()=>{
    if((req as AuthenticatedRequest).token._id === req.params.id && (req as AuthenticatedRequest).token.userType.description === 'client') // la primer comparación permite que un un usuario sólo se pueda buscar a sí mismo, y no a otros usuarios y obtener sus datos
    {
      next();
    } else {
      return next(res.status(403).json({message:'Not Authorized'}))
    }
  })
}


export async function verifyAdmin(req: Request, res: Response, next: NextFunction)
{
  verifyToken(req, res, ()=>{
    if((req as AuthenticatedRequest).token.userType.description === 'admin'){  // hay que ver si lo popula o si hay que hacer un find
      next();
    } else {
      return next(res.status(403).json({message:'Not Authorized'}))
    }
  })
} 


export async function verifyDelivery(req: Request, res: Response, next: NextFunction)
{
  verifyToken(req, res, ()=>{
    if((req as AuthenticatedRequest).token._id === req.params.id && (req as AuthenticatedRequest).token.userType.description === 'delivery'){  // hay que ver si lo popula o si hay que hacer un find
      next();
    } else {
      return next(res.status(403).json({message:'Not Authorized'}))
    }
  })
} 


export async function verifyOwner(req: Request, res: Response, next: NextFunction)
{
  verifyToken(req, res, ()=>{
    if((req as AuthenticatedRequest).token._id === req.params.id && (req as AuthenticatedRequest).token.userType.description === 'owner'){  // hay que ver si lo popula o si hay que hacer un find
      next();
    } else {
      return next(res.status(403).json({message:'Not Authorized'}))
    }
  })
} 
