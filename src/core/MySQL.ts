import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT ?? 3306),
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});

export async function closeConnection(): Promise<void> {
  await pool.end().catch(() => {});
  console.log('✅ Pool MySQL cerrado');
}

export async function initDB(): Promise<void> {
  try {
    await pool.execute('SELECT 1');
    console.log('✅ MySQL conectado');

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla users lista');

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS gamers (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        genero VARCHAR(100) NOT NULL,
        descripcion TEXT NOT NULL,
        plataforma VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    console.log('✅ Tabla gamers lista');

  } catch (error) {
    console.error('❌ Error conectando DB:', error);
    throw error;
  }
}