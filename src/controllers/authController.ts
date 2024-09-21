import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma'; // Asegúrate de importar correctamente el cliente de Prisma
import { jwtSecret, jwtExpiration } from '../config/jwtConfig';

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { user },
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar un token JWT que incluye el rol del usuario
    const token = jwt.sign(
      { id: usuario.id_usuario, role: usuario.rol }, // Incluye el rol en el token
      jwtSecret,
      { expiresIn: jwtExpiration } // Configuración del tiempo de expiración
    );

    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
