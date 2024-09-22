import { Router } from 'express';
import { getUsuarios } from '../controllers/usuarioController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Ruta para obtener todos los usuarios, solo accesible por ADMIN
router.get('/usuarios', authenticateToken, authorizeRoles('ADMIN'), getUsuarios);

export default router;
