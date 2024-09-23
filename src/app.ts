import express from 'express';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import mesaRoutes from './routes/mesaRoutes';
import cors from 'cors';
import platilloRoutes from './routes/platilloRoutes';
import inventarioRoutes from './routes/inventarioRoutes'
import ordenRoutes from './routes/ordenRoutes';
import meseroRoutes from './routes/meseroRoutes';
import facturaRoutes from './routes/facturaRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', //(PORT:5173)
  credentials: true,
}));

app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Rutas protegidas
app.use('/api', usuarioRoutes); // Rutas que requieren autenticación

app.use('/api', mesaRoutes);

// Servir la carpeta 'uploads' como estática
app.use('/uploads', express.static('uploads'));

// Registrar rutas
app.use('/api', platilloRoutes);

app.use('/api', inventarioRoutes);

app.use('/api', ordenRoutes);

app.use('/api', meseroRoutes);

app.use('/api', facturaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
