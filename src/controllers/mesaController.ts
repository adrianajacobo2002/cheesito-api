import { Request, Response } from "express";
import { EstadoMesa } from '@prisma/client';
import Mesa from "../models/Mesa"
import Orden from "../models/Orden";

export default class mesaController{

  static async getAll(req: Request, res: Response) {
    try {
      // Obtener todas las mesas
      const mesas = await Mesa.getAllTables();

      // Para cada mesa, verificar si tiene una orden activa (estado OCUPADO)
      const mesasConOrdenes = await Promise.all(
        mesas.map(async (mesa) => {
          if (mesa.estado === "OCUPADO") {
            // Buscar la orden asociada a la mesa que no esté cancelada
            const orden = await Orden.getOrdenByMesaId(mesa.id_mesa);

            // Si hay una orden activa, agregar el nombre del cliente y el estado
            return {
              ...mesa,
              orden: orden
                ? { nombre_cliente: orden.nombre_cliente, estado: orden.estado }
                : null,
            };
          } else {
            return { ...mesa, orden: null }; // Si no está ocupada, no tiene orden
          }
        })
      );

      res.status(200).json(mesasConOrdenes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las mesas", error });
    }
  }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const mesa = await Mesa.getTableById(+id);
          if (mesa) {
            res.status(200).json(mesa);
          } else {
            res.status(404).json({ message: 'Mesa no encontrada' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error al obtener la mesa' });
        }
    }

    static async create(req: Request, res: Response) {
        const { num_mesa, capacidad } = req.body;
        
        try {
          const nuevaMesa = await Mesa.createTable(num_mesa, "DISPONIBLE", capacidad);
          res.status(201).json(nuevaMesa);
        } catch (error) {
          res.status(500).json({ message: 'Error al crear la mesa' });
        }
    }

    static async updateEstadoMesa(req: Request, res: Response) {
        const { id } = req.params;
        const { estado } = req.body;
    
        try {
          const mesaActualizada = await Mesa.updateTable(Number(id), { estado: estado as EstadoMesa });
          res.status(200).json(mesaActualizada);
        } catch (error) {
          res.status(500).json({ message: 'Error al actualizar la mesa', error: error });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const mesaEliminada = await Mesa.deleteTable(+id);
          if (mesaEliminada) {
            res.status(200).json({ message: 'Mesa eliminada correctamente' });
          } else {
            res.status(404).json({ message: 'Error al eliminar la mesa o mesa no encontrada' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error al eliminar la mesa' });
        }
    }
}