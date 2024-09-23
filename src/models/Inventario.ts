import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Inventario{

    static async getPizzasDisponibles(){
        return await prisma.inventario.findMany({
            where:{
                platillo:{
                    tipo: 'COMIDA'
                },
                cantidad_disponible:{
                    gte: 1
                },
            },
            include:{platillo: true}
        });
    }

    static async getPizzasFueraStock(){
        return await prisma.inventario.findMany({
            where:{
                platillo:{
                    tipo: 'COMIDA'
                },
                cantidad_disponible:{
                    equals: 0
                }
            },
            include: {platillo: true}
        });
    }

    static async getBebidasDisponibles(){
        return await prisma.inventario.findMany({
            where:{
                platillo:{
                    tipo: 'BEBIDA'
                },
                cantidad_disponible:{
                    gte: 1
                },
            },
            include:{platillo: true}
        });
    }

    static async getBebidasFueraStock(){
        return await prisma.inventario.findMany({
            where:{
                platillo:{
                    tipo: 'BEBIDA'
                },
                cantidad_disponible:{
                    equals: 0
                }
            },
            include: {platillo: true}
        });
    }

    static async findProductoById(id: number) {
        return await prisma.inventario.findUnique({
            where: { id_inventario: id },
        });
    }

    static async addProducto(platillo_id: number, cantidad: number){
        return await prisma.inventario.create({

            data:{
                platillo_id,
                cantidad_disponible: cantidad,
            },
        });
    }

    static async updateCantidad(id: number, cantidad: number){
        return await  prisma.inventario.update({
            where:{ id_inventario: id },
            data: { cantidad_disponible: cantidad },
        });
    }

    static async deleteProducto(id: number){
        return await prisma.inventario.delete({

            where: { id_inventario: id },
        });
    }

    static async filterProductosByStock(enStock: boolean){
        return await prisma.inventario.findMany({
            where: {
                cantidad_disponible: enStock ? { gte: 1} : { equals: 0}
            },
            include: { platillo: true }
        });
    }

}