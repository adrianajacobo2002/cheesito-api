import express from 'express';
import OrdenController from '../controllers/ordenController';

const router = express.Router();

// Crear nueva orden
router.post('/ordenes', OrdenController.create);

// Obtener todas las órdenes
router.get('/ordenes', OrdenController.getAll);

// Obtener detalles de una orden específica
router.get('/ordenes/:id', OrdenController.getById);

// Agregar platillos a la orden
router.post('/ordenes/:id/platillos', OrdenController.addPlatillos);

// Cambiar el estado de un platillo en una orden
router.patch('/ordenes/detalles/:id_detalle_orden', OrdenController.updateEstadoPlatillo);

router.delete('/ordenes/detalles/:id_detalle_orden', OrdenController.deleteDetalleOrden);

// Eliminar una orden
router.delete('/ordenes/:id', OrdenController.delete);

// Cambiar el estado de una orden
router.patch('/ordenes/:id', OrdenController.updateEstadoOrden);

export default router;
