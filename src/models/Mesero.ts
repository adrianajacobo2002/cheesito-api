import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Mesero {
  // Crear un nuevo mesero
  static async createMesero(nombre: string) {
    return await prisma.mesero.create({
      data: {
        nombre,
      },
    });
  }

  // Obtener todos los meseros
  static async getAllMeseros() {
    return await prisma.mesero.findMany();
  }

  // Obtener un mesero por su ID
  static async getMeseroById(id_mesero: number) {
    return await prisma.mesero.findUnique({
      where: { id_mesero },
    });
  }

  // Actualizar un mesero
  static async updateMesero(id_mesero: number, nombre: string) {
    return await prisma.mesero.update({
      where: { id_mesero },
      data: { nombre },
    });
  }

  // Eliminar un mesero
  static async deleteMesero(id_mesero: number) {
    return await prisma.mesero.delete({
      where: { id_mesero },
    });
  }
}
