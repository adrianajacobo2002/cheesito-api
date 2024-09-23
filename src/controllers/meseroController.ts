import { Request, Response } from 'express';
import Mesero from '../models/mesero';

export default class MeseroController {
  // Crear un nuevo mesero
  static async create(req: Request, res: Response) {
    const { nombre } = req.body;

    try {
      const nuevoMesero = await Mesero.createMesero(nombre);
      res.status(201).json(nuevoMesero);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el mesero', error });
    }
  }

  // Obtener todos los meseros
  static async getAll(req: Request, res: Response) {
    try {
      const meseros = await Mesero.getAllMeseros();
      res.status(200).json(meseros);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los meseros', error });
    }
  }

  // Obtener un mesero por ID
  static async getById(req: Request, res: Response) {
    const { id_mesero } = req.params;

    try {
      const mesero = await Mesero.getMeseroById(Number(id_mesero));

      if (!mesero) {
        return res.status(404).json({ message: 'Mesero no encontrado' });
      }

      res.status(200).json(mesero);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el mesero', error });
    }
  }

  // Actualizar un mesero
  static async update(req: Request, res: Response) {
    const { id_mesero } = req.params;
    const { nombre } = req.body;

    try {
      const meseroActualizado = await Mesero.updateMesero(Number(id_mesero), nombre);

      if (!meseroActualizado) {
        return res.status(404).json({ message: 'Mesero no encontrado' });
      }

      res.status(200).json(meseroActualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el mesero', error });
    }
  }

  // Eliminar un mesero
  static async delete(req: Request, res: Response) {
    const { id_mesero } = req.params;

    try {
      await Mesero.deleteMesero(Number(id_mesero));
      res.status(200).json({ message: 'Mesero eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el mesero', error });
    }
  }
}
