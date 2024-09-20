import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta básica
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, Express con TypeScript!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
