import { Request, Response } from 'express';
import prisma from '../../prisma';

// Obtener todos los usuarios (ruta protegida)
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};
