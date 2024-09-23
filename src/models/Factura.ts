import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Factura {
  // Crear una nueva factura
  static async createFactura(orden_id: number, subtotal: number, propina: number, total: number) {
    return await prisma.factura.create({
      data: {
        orden_id,
        subtotal,
        propina,
        total
      }
    });
  }

  // Obtener una factura por su ID
  static async getFacturaById(id_factura: number) {
    return await prisma.factura.findUnique({
      where: { id_factura },
      include: {
        orden: {
          include: {
            detalleOrden: true, // Incluye los detalles de la orden
          }
        }
      }
    });
  }

  // Obtener todas las facturas
  static async getAllFacturas() {
    return await prisma.factura.findMany({
      include: {
        orden: {
          include: {
            detalleOrden: true, // Incluye los detalles de las órdenes en cada factura
          }
        }
      }
    });
  }

  // Eliminar una factura por su ID
  static async deleteFactura(id_factura: number) {
    return await prisma.factura.delete({
      where: { id_factura }
    });
  }
}
