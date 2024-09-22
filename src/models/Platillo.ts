import { PrismaClient, TipoPlatillo } from "@prisma/client";
import Inventario from "./Inventario";

const prisma = new PrismaClient();

export default class Platillo {
  // Obtener todos los platillos
  static async getAllPlatillos() {
    return await prisma.platillo.findMany();
  }

  // Obtener un platillo por su ID
  static async getPlatilloById(id: number) {
    return await prisma.platillo.findUnique({
      where: { id_platillos: id },
    });
  }

  // Crear un nuevo platillo
  static async createPlatillo(
    nombre: string,
    precio: number,
    tipo: TipoPlatillo,
    image_url: string
  ) {
    const nuevoPlatillo = await prisma.platillo.create({
      data: {
        nombre,
        precio,
        tipo,
        image_url,
      },
    });

    // Después de crear el platillo, agregarlo automáticamente al inventario con cantidad 0
    await Inventario.addProducto(nuevoPlatillo.id_platillos, 0);

    return nuevoPlatillo;
  }

  // Actualizar un platillo
  static async updatePlatillo(
    id: number,
    data: Partial<{
      nombre: string;
      precio: number;
      tipo: TipoPlatillo;
      image_url: string;
    }>
  ) {
    return await prisma.platillo.update({
      where: { id_platillos: id },
      data,
    });
  }

  static async getInventarioByPlatilloId(platilloId: number) {
    return await prisma.inventario.findFirst({
      where: { platillo_id: platilloId },
    });
  }

  // Eliminar un platillo solo si su cantidad en inventario es 0
  static async deletePlatillo(id: number) {
    const inventario = await this.getInventarioByPlatilloId(id);

    // Validar si la cantidad es mayor a 0
    if (inventario && inventario.cantidad_disponible > 0) {
      throw new Error('No se puede eliminar el platillo, aún hay productos disponibles en el inventario.');
    }

    // Si la cantidad es 0, eliminar primero del inventario
    if (inventario) {
      await prisma.inventario.deleteMany({
        where: { platillo_id: id },
      });
    }

    // Luego, eliminar el platillo
    return await prisma.platillo.delete({
      where: { id_platillos: id },
    });
  }
}
