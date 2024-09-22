import { EstadoMesa } from '@prisma/client';
import prisma from '../../prisma';

export default class Mesa{

    static async getAllTables(){
        return await prisma.mesa.findMany();
    }

    static async getTableById(id: number){
        return await prisma.mesa.findUnique({
            where: {
                id_mesa: id,
            },
        });
    }

    static async createTable(num_mesa: number, estado: EstadoMesa, capacidad: number) {
        return await prisma.mesa.create({
          data: {
            num_mesa,
            estado,
            capacidad,
          },
        });
    }

    static async updateTable(id: number, data: Partial<{ estado: EstadoMesa }>) {
        return await prisma.mesa.update({
          where: { id_mesa: id },
          data,
        });
    }

    static async deleteTable(id: number) {
        try {
          await prisma.mesa.delete({
            where: {
              id_mesa: id,
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      }

}