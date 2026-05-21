import express from 'express';
import cors from 'cors';
import { RegisterUserRoutes } from './User/Infraestructure/Router/UserRouter';
import { RegisterGamerRoutes } from './Gamer/Infraestructura/Router/GamerRouter';
import { UserController } from './User/Infraestructure/Controllers/UserControllers';
import { UserService } from './User/Application/Userservice';
import { MySQLUserRepository } from './User/Infraestructure/DataBase/MysqlUser';
import { GamerController } from './Gamer/Infraestructura/Controllers/GamerControllers';
import { GamerService } from './Gamer/Application/Gamerservice';
import { MySQLGamerRepository } from './Gamer/Infraestructura/DataBase/MysqlGamer';
import { initDB, pool } from './core/MySQL';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({
    message: 'Test endpoint funcionando',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', async (_, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    res.json({
      status: 'OK',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      status: 'OK',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

let isInitialized = false;

export async function initializeRoutes() {
  if (isInitialized) {
    console.log('✅ Rutas ya inicializadas');
    return;
  }

  try {
    console.log('🚀 Inicializando rutas...');
    await initDB();
    console.log('📦 Conexión MySQL lista');

    // Inyección de dependencias - User
    const userRepository = new MySQLUserRepository(pool);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    // Inyección de dependencias - Gamer
    const gamerRepository = new MySQLGamerRepository(pool);
    const gamerService = new GamerService(gamerRepository);
    const gamerController = new GamerController(gamerService);

    // Registro de rutas
    RegisterUserRoutes(app, userController);
    RegisterGamerRoutes(app, gamerController);

    app.get('/', (_, res) => {
      res.json({
        mensaje: 'API GameVault',
        version: '1.0.0',
        endpoints: {
          users: '/users',
          gamers: '/gamers'
        },
        timestamp: new Date().toISOString()
      });
    });

    isInitialized = true;
    console.log('✅ Rutas inicializadas correctamente');
  } catch (error) {
    console.error('❌ Error FATAL inicializando rutas:', error);
    throw error;
  }
}

export default app;