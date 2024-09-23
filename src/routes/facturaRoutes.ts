import express from 'express';
import FacturaController from '../controllers/facturaController';

const router = express.Router();

// Crear una nueva factura
router.post('/facturas', FacturaController.create);

// Obtener todas las facturas
router.get('/facturas', FacturaController.getAll);

// Obtener una factura por ID
router.get('/facturas/:id_factura', FacturaController.getById);

// Eliminar una factura
router.delete('/facturas/:id_factura', FacturaController.delete);

export default router;
