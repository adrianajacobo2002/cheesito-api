import express from 'express';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import mesaRoutes from './routes/mesaRoutes';

const app = express();

app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Rutas protegidas
app.use('/api', usuarioRoutes); // Rutas que requieren autenticación

app.use('/api', mesaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
