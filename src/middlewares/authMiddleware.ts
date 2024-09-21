import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig';

// Extender la interfaz Request para incluir 'user'
interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload; // Ajusta según lo que almacenes en `req.user`
}

// Middleware para autenticar el token JWT
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El token viene en el formato: "Bearer <token>"

  if (!token) return res.sendStatus(401); // No autorizado si no hay token

  // Verificar el token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido o expirado
    req.user = user; // Almacena el usuario en la solicitud
    next(); // Continúa con la siguiente función
  });
};

// Middleware para verificar roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes((req.user as any).role)) {
      return res.status(403).json({ message: 'Acceso denegado: no tienes los permisos necesarios' });
    }
    next(); // Si el usuario tiene el rol adecuado, continua
  };
};
