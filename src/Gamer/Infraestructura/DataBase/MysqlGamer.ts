// Infrastructure/Repositories/MySQLGamerRepository.ts
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { Gamer } from '../../Domain/Entities/Gamer';
import { GamerRepository } from '../../Domain/Repositories/GamerRepository';

export class MySQLGamerRepository implements GamerRepository {
  constructor(private db: mysql.Pool) {}

  async create(gamer: Gamer): Promise<Gamer> {
    const id = crypto.randomUUID();
    await this.db.execute(
      `INSERT INTO gamers (id, titulo, genero, descripcion, plataforma, precio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, gamer.titulo, gamer.genero, gamer.descripcion, gamer.plataforma, gamer.precio]
    );
    return { ...gamer, id };
  }

  async getById(id: string): Promise<Gamer | null> {
    const [rows] = await this.db.execute<any[]>(
      `SELECT * FROM gamers WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  async getAll(): Promise<Gamer[]> {
    const [rows] = await this.db.execute<any[]>(`SELECT * FROM gamers`);
    return rows;
  }

  async update(gamer: Gamer): Promise<Gamer> {
    await this.db.execute(
      `UPDATE gamers SET titulo=?, genero=?, descripcion=?, plataforma=?, precio=?
       WHERE id = ?`,
      [gamer.titulo, gamer.genero, gamer.descripcion, gamer.plataforma, gamer.precio, gamer.id]
    );
    return gamer;
  }

  async delete(id: string): Promise<void> {
    await this.db.execute(`DELETE FROM gamers WHERE id = ?`, [id]);
  }
}