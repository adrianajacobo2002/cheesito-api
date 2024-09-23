import { Request, Response } from "express";
import Inventario from "../models/Inventario";

export default class InventarioController {

    static async getPizzasDisponibles(req: Request, res: Response){
        try {
            const pizzas = await Inventario.getPizzasDisponibles();
            res.status(200).json(pizzas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las pizzas disponibles', error });
        }
    }

    static async getBebidasDisponibles(req: Request,  res: Response){
        try {
            const bebidas = await Inventario.getBebidasDisponibles();
            res.status(200).json(bebidas)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las bebidas disponibles', error });
        }
    }

    static async getPizzasFueraStock(req: Request, res: Response) {
        try {
          const pizzas = await Inventario.getPizzasFueraStock();
          res.status(200).json(pizzas);
        } catch (error) {
          res.status(500).json({ message: 'Error al obtener las pizzas fuera de stock', error });
        }
    }

    static async getBebidasFueraStock(req: Request, res: Response) {
        try {
          const bebidas = await Inventario.getBebidasFueraStock();
          res.status(200).json(bebidas);
        } catch (error) {
          res.status(500).json({ message: 'Error al obtener las bebidas fuera de stock', error });
        }
    }

    static async addProducto(req: Request, res: Response) {
        const { platillo_id, cantidad } = req.body;
        try {
          const nuevoProducto = await Inventario.addProducto(platillo_id, cantidad);
          res.status(201).json(nuevoProducto);
        } catch (error) {
          res.status(500).json({ message: 'Error al agregar producto al inventario', error });
        }
    }

    static async updateCantidad(req: Request, res: Response) {
      const { id } = req.params;
      const { cantidad } = req.body;
      try {
          const productoActual = await Inventario.findProductoById(Number(id));
          if (!productoActual) {
              return res.status(404).json({ message: "Producto no encontrado" });
          }
          const nuevaCantidad = productoActual.cantidad_disponible + cantidad;
          const productoActualizado = await Inventario.updateCantidad(Number(id), nuevaCantidad);
          res.status(200).json(productoActualizado);
      } catch (error) {
          res.status(500).json({ message: 'Error al actualizar la cantidad de producto', error });
      }
    }

    static async deleteProducto(req: Request, res: Response) {
        const { id } = req.params;
        try {
          await Inventario.deleteProducto(Number(id));
          res.status(200).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          res.status(500).json({ message: 'Error al eliminar el producto del inventario', error });
        }
    }

    static async filterProductosByStock(req: Request, res: Response) {
        const { enStock } = req.query;
        try {
          const productos = await Inventario.filterProductosByStock(enStock === 'true');
          res.status(200).json(productos);
        } catch (error) {
          res.status(500).json({ message: 'Error al filtrar productos', error });
        }
    }
}