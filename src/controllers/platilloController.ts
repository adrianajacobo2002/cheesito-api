import { Request, Response } from 'express';
import Platillo from '../models/Platillo';
import { TipoPlatillo } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export default class PlatilloController {
  // Obtener todos los platillos
  static async getAll(req: Request, res: Response) {
    try {
      const platillos = await Platillo.getAllPlatillos();
      res.status(200).json(platillos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los platillos' });
    }
  }

  // Obtener un platillo por ID
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const platillo = await Platillo.getPlatilloById(Number(id));
      if (platillo) {
        res.status(200).json(platillo);
      } else {
        res.status(404).json({ message: 'Platillo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el platillo' });
    }
  }

  // Crear un nuevo platillo
  static async create(req: Request, res: Response) {
    const { nombre, precio, tipo } = req.body;
    const file = req.file; // Multer almacena la imagen aquí

    if (!file) {
      return res.status(400).json({ message: 'La imagen es obligatoria' });
    }

    try {
      const nuevoPlatillo = await Platillo.createPlatillo(nombre, parseFloat(precio), tipo as TipoPlatillo, file.filename); // Guardamos el nombre del archivo en image_url
      res.status(201).json(nuevoPlatillo);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el platillo', error });
    }
  }

  // Actualizar un platillo (opcionalmente cambiar imagen)
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, precio, tipo } = req.body;
    const file = req.file; // Si hay una imagen nueva, Multer la maneja aquí

    try {
      const updatedData = {
        nombre,
        precio: parseFloat(precio),
        tipo: tipo as TipoPlatillo,
        image_url: file ? file.filename : undefined, // Solo actualizar la imagen si se subió una nueva
      };

      const updatedPlatillo = await Platillo.updatePlatillo(Number(id), updatedData);
      res.status(200).json(updatedPlatillo);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el platillo', error });
    }
  }

  // Eliminar un platillo
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const platillo = await Platillo.getPlatilloById(Number(id));
        if (platillo) {
          const filePath = path.join(__dirname, '../uploads', platillo.image_url);
  
          // Verificar si el archivo existe antes de intentar eliminarlo
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Elimina la imagen del servidor
          } else {
            console.log("El archivo no existe, no se puede eliminar.");
          }
  
          await Platillo.deletePlatillo(Number(id));
          res.status(200).json({ message: 'Platillo eliminado correctamente' });
        } else {
          res.status(404).json({ message: 'Platillo no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el platillo', error });
      }
  }
}
