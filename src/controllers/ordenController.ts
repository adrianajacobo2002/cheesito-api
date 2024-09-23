import { Request, Response } from 'express';
import Orden from '../models/Orden';

export default class OrdenController {
  // Crear una nueva orden
  static async create(req: Request, res: Response) {
    const { nombre_cliente, mesero_id, mesa_id } = req.body;

    try {
      const nuevaOrden = await Orden.createOrden({ nombre_cliente, mesero_id, mesa_id });
      res.status(201).json(nuevaOrden);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la orden', error });
    }
  }

  // Obtener todas las órdenes
  static async getAll(req: Request, res: Response) {
    try {
      const ordenes = await Orden.getAllOrdenes();
      res.status(200).json(ordenes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las órdenes', error });
    }
  }

  // Obtener los detalles de una orden específica
  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const orden = await Orden.getOrdenById(Number(id));
      if (orden) {
        res.status(200).json(orden);
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la orden', error });
    }
  }

  // Agregar platillos a una orden
  static async addPlatillos(req: Request, res: Response) {
    const { id } = req.params;  // ID de la orden
    const { detalles } = req.body;  // Array de detalles { platillo_id, cantidad }

    try {
      const nuevosDetalles = await Orden.addPlatillosToOrden(Number(id), detalles);
      res.status(201).json(nuevosDetalles);
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar platillos a la orden', error });
    }
  }

  // Cambiar el estado de un platillo en una orden
  static async updateEstadoPlatillo(req: Request, res: Response) {
    const { id_detalle_orden } = req.params;
    const { estado } = req.body;

    try {
      const detalleActualizado = await Orden.updateEstadoPlatillo(Number(id_detalle_orden), estado);
      res.status(200).json(detalleActualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del platillo', error });
    }
  }

  static async deleteDetalleOrden(req: Request, res: Response) {
    const { id_detalle_orden } = req.params;

    try {
      const detalleEliminado = await Orden.deleteDetalleOrden(Number(id_detalle_orden));

      if (detalleEliminado) {
        res.status(200).json({ message: 'Detalle de orden eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Detalle de orden no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el detalle de la orden', error });
    }
  }

  // Eliminar una orden
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await Orden.deleteOrden(Number(id));
      res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la orden', error });
    }
  }

  // Cambiar el estado de una orden
  static async updateEstadoOrden(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;

    try {
      const ordenActualizada = await Orden.updateEstadoOrden(Number(id), estado);
      res.status(200).json(ordenActualizada);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado de la orden', error });
    }
  }
}
