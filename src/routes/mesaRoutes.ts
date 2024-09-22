import express from 'express';
import MesaController from '../controllers/mesaController';

const router = express.Router();

// Obtener todas las mesas
router.get('/mesas', MesaController.getAll);

// Obtener una mesa por ID
router.get('/mesas/:id', MesaController.getById);

// Crear una nueva mesa
router.post('/mesas', MesaController.create);

// Actualizar una mesa
router.patch('/mesas/:id', MesaController.updateEstadoMesa);

// Eliminar una mesa
router.delete('/mesas/:id', MesaController.delete);

export default router;