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
      // Crear el platillo y agregarlo automáticamente al inventario con cantidad 0
      const nuevoPlatillo = await Platillo.createPlatillo(nombre, parseFloat(precio), tipo as TipoPlatillo, file.filename);
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

  
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
      // Obtener el platillo por su ID
      const platillo = await Platillo.getPlatilloById(Number(id));
      
      if (!platillo) {
        return res.status(404).json({ message: 'Platillo no encontrado' });
      }
      
      // Verificar el inventario asociado al platillo
      const inventario = await Platillo.getInventarioByPlatilloId(Number(id)); // Añadimos este método para obtener el inventario

      // Validar que la cantidad en inventario sea 0
      if (inventario && inventario.cantidad_disponible > 0) {
        return res.status(400).json({
          message: 'No se puede eliminar el platillo, aún hay productos disponibles en el inventario.'
        });
      }

      // Eliminar la imagen del servidor si existe
      const filePath = path.join(__dirname, '../uploads', platillo.image_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Elimina la imagen del servidor
      } else {
        console.log("El archivo no existe, no se puede eliminar.");
      }

      // Eliminar el platillo y su registro en inventario
      await Platillo.deletePlatillo(Number(id));
      
      res.status(200).json({ message: 'Platillo y su inventario eliminados correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el platillo', error });
    }
  }

}
