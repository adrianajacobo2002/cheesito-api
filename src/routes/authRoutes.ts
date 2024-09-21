import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Ruta para manejar el login
router.post('/login', login);

export default router;
