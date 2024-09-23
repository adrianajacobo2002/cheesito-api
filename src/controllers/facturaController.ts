import { Request, Response } from 'express';
import Factura from '../models/Factura';
import { PrismaClient } from '@prisma/client';
import { EstadoOrden, EstadoMesa } from "@prisma/client";
import Orden from "../models/Orden";
import Mesa from "../models/Mesa";

const prisma = new PrismaClient();

export default class FacturaController {
  // Crear una nueva factura
  static async create(req: Request, res: Response) {
    const { orden_id } = req.body;

    try {
      // Obtener la orden y sus detalles
      const orden = await prisma.orden.findUnique({
        where: { id_orden: Number(orden_id) },
        include: {
          detalleOrden: {
            include: { platillo: true }
          }
        }
      });

      if (!orden) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      // Calcular el subtotal sumando todos los subtotales de los detalles de la orden
      const subtotal = orden.detalleOrden.reduce((acc, detalle) => {
        return acc + detalle.subtotal;
      }, 0);

      // Calcular la propina (por ejemplo, el 10%)
      const propina = subtotal * 0.1;

      // Calcular el total (subtotal + propina)
      const total = subtotal + propina;

      // Crear la factura
      const nuevaFactura = await Factura.createFactura(orden.id_orden, subtotal, propina, total);

      // Actualizar el estado de la orden a CANCELADO
      await Orden.updateEstadoOrden(orden.id_orden, EstadoOrden.CANCELADO);

      // Actualizar el estado de la mesa a DISPONIBLE
      await Mesa.updateTable(orden.mesa_id, { estado: EstadoMesa.DISPONIBLE });

      res.status(201).json(nuevaFactura);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la factura', error });
    }
  }

  // Obtener todas las facturas
  static async getAll(req: Request, res: Response) {
    try {
      const facturas = await Factura.getAllFacturas();
      res.status(200).json(facturas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las facturas', error });
    }
  }

  // Obtener una factura por su ID
  static async getById(req: Request, res: Response) {
    const { id_factura } = req.params;

    try {
      const factura = await Factura.getFacturaById(Number(id_factura));

      if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }

      res.status(200).json(factura);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la factura', error });
    }
  }

  // Eliminar una factura
  static async delete(req: Request, res: Response) {
    const { id_factura } = req.params;

    try {
      await Factura.deleteFactura(Number(id_factura));
      res.status(200).json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la factura', error });
    }
  }
}
