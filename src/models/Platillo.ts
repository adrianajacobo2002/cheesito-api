import { PrismaClient, TipoPlatillo } from '@prisma/client';

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
    static async createPlatillo(nombre: string, precio: number, tipo: TipoPlatillo, image_url: string) {
      return await prisma.platillo.create({
        data: {
          nombre,
          precio,
          tipo,
          image_url,
        },
      });
    }
  
    // Actualizar un platillo
    static async updatePlatillo(id: number, data: Partial<{ nombre: string; precio: number; tipo: TipoPlatillo; image_url: string }>) {
      return await prisma.platillo.update({
        where: { id_platillos: id },
        data,
      });
    }
  
    // Eliminar un platillo
    static async deletePlatillo(id: number) {
      return await prisma.platillo.delete({
        where: { id_platillos: id },
      });
    }
  }