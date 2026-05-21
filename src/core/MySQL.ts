import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let connection: mysql.Connection | null = null;

export async function getConnection(): Promise<mysql.Connection> {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      port: Number(process.env.DB_PORT ?? 3306),
      connectTimeout: 10000
    });
  }
  return connection;
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    await connection.end().catch(() => {});
    connection = null;
  }
}

export async function initDB(): Promise<void> {
  try {
    const conn = await getConnection();
    await conn.query('SELECT 1');
    console.log('✅ MySQL conectado');

    // Crear tabla users automáticamente
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla users lista');

    // Crear tabla gamers automáticamente
    await conn.query(`
      CREATE TABLE IF NOT EXISTS gamers (
        id VARCHAR(36) PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        genero VARCHAR(100) NOT NULL,
        descripcion TEXT NOT NULL,
        plataforma VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla gamers lista');

  } catch (error) {
    console.error('❌ Error conectando DB:', error);
    connection = null;
    throw error;
  }
}

export const pool = {
  execute: async (sql: string, params?: any[]) => {
    const conn = await getConnection();
    return conn.execute(sql, params);
  },
  getConnection: async () => {
    const conn = await getConnection();
    return { ...conn, release: () => {} };
  }
} as any;