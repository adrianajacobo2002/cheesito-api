import express from 'express';
import MeseroController from '../controllers/meseroController';

const router = express.Router();

// Crear un nuevo mesero
router.post('/meseros', MeseroController.create);

// Obtener todos los meseros
router.get('/meseros', MeseroController.getAll);

// Obtener un mesero por ID
router.get('/meseros/:id_mesero', MeseroController.getById);

// Actualizar un mesero
router.put('/meseros/:id_mesero', MeseroController.update);

// Eliminar un mesero
router.delete('/meseros/:id_mesero', MeseroController.delete);

export default router;
