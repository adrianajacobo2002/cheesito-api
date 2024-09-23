import { EstadoDetalleOrden, EstadoOrden, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Orden {
  // Crear una nueva orden
  static async createOrden(data: {
    nombre_cliente: string;
    mesero_id: number;
    mesa_id: number;
  }) {
    return await prisma.orden.create({
      data: {
        nombre_cliente: data.nombre_cliente,
        mesero_id: data.mesero_id,
        mesa_id: data.mesa_id,
      },
    });
  }

  // Obtener todas las órdenes con relaciones
  static async getAllOrdenes() {
    return await prisma.orden.findMany({
      include: {
        detalleOrden: true, // Incluir los detalles de la orden
        mesa: true,
        mesero: true,
      },
    });
  }

  // Obtener detalles de una orden específica por su ID
  static async getOrdenById(id: number) {
    return await prisma.orden.findUnique({
      where: { id_orden: id },
      include: {
        detalleOrden: true,
        mesa: true,
        mesero: true,
      },
    });
  }

  // Agregar platillos a una orden (crear registros en DetalleOrden)
  static async addPlatillosToOrden(orden_id: number, detalles: { platillo_id: number, cantidad: number }[]) {
    const detallesData = await Promise.all(
      detalles.map(async (detalle) => {
        // Obtener el precio del platillo desde la base de datos
        const platillo = await prisma.platillo.findUnique({
          where: { id_platillos: detalle.platillo_id },
        });

        if (!platillo) {
          throw new Error(`Platillo con ID ${detalle.platillo_id} no encontrado`);
        }

        // Calcular el subtotal como cantidad * precio del platillo
        const subtotal = detalle.cantidad * platillo.precio;

        return {
          orden_id,
          platillo_id: detalle.platillo_id,
          cantidad: detalle.cantidad,
          subtotal: subtotal, // Subtotal calculado
          estado: EstadoDetalleOrden.EN_PREPARACION, // Estado inicial al agregar el platillo
        };
      })
    );

    return await prisma.detalleOrden.createMany({
      data: detallesData,
    });
  }

  // Eliminar un registro de detalle_orden
  static async deleteDetalleOrden(id_detalle_orden: number) {
    return await prisma.detalleOrden.delete({
      where: { id_detalle_orden },
    });
  }

  // Eliminar una orden
  static async deleteOrden(id: number) {
    return await prisma.orden.delete({
      where: { id_orden: id },
    });
  }

  // Cambiar el estado de una orden
  static async updateEstadoOrden(id_orden: number, estado: EstadoOrden) {
    return await prisma.orden.update({
      where: { id_orden: id_orden },
      data: { estado },
    });
  }

  // Cambiar el estado de un platillo en una orden
  static async updateEstadoPlatillo(
    id_detalle_orden: number,
    estado: EstadoDetalleOrden
  ) {
    return await prisma.detalleOrden.update({
      where: { id_detalle_orden: id_detalle_orden },
      data: { estado },
    });
  }
}
