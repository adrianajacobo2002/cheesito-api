import express from 'express';
import InventarioController from '../controllers/inventarioController';

const router = express.Router();

// Obtener pizzas disponibles
router.get('/inventario/pizzas/disponibles', InventarioController.getPizzasDisponibles);

// Obtener bebidas disponibles
router.get('/inventario/bebidas/disponibles', InventarioController.getBebidasDisponibles);

// Obtener pizzas fuera de stock
router.get('/inventario/pizzas/fuera-stock', InventarioController.getPizzasFueraStock);

// Obtener bebidas fuera de stock
router.get('/inventario/bebidas/fuera-stock', InventarioController.getBebidasFueraStock);

// Agregar un producto al inventario
// router.post('/inventario/producto', InventarioController.addProducto);

// Actualizar la cantidad de un producto
router.put('/inventario/producto/:id', InventarioController.updateCantidad);

// Eliminar un producto del inventario
// router.delete('/inventario/producto/:id', InventarioController.deleteProducto);

// Filtrar productos por stock (disponibles o fuera de stock)
router.get('/inventario/filtrar', InventarioController.filterProductosByStock);

export default router;
