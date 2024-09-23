import bcrypt from 'bcrypt';
import prisma from '../prisma'; // Asegúrate de importar correctamente el cliente de Prisma

// Función para crear un usuario con la contraseña encriptada
const crearUsuario = async () => {
  const saltRounds = 10;
  const passwordPlano = "Chef123";  // La contraseña en texto plano que quieres encriptar

  // Encripta la contraseña
  const hashedPassword = await bcrypt.hash(passwordPlano, saltRounds);

  // Guarda el usuario con la contraseña encriptada en la base de datos
  await prisma.usuario.create({
    data: {
      user: 'Cocinero1',
      password: hashedPassword,
      rol: 'COCINERO',
    },
  });

  console.log('Usuario creado con contraseña encriptada');
};

crearUsuario();
