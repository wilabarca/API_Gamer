import { Request, Response } from 'express';
import { GamerService } from '../../Application/Gamerservice';
import { Gamer } from '../../Domain/Entities/Gamer';

export class GamerController {
  constructor(private service: GamerService) {}

  async createGamer(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id, titulo, genero, descripcion, plataforma, precio } = req.body;

      if (!user_id || !titulo || !genero || !descripcion || !plataforma || precio === undefined) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const gamer: Gamer = {
        id: '',
        user_id,
        titulo,
        genero,
        descripcion,
        plataforma,
        precio,
      };

      await this.service.createGamer(gamer);
      return res.status(201).json({ mensaje: 'Juego creado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear juego' });
    }
  }

  async getAllGamers(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.query.user_id as string;

      if (user_id) {
        const gamers = await this.service.getGamersByUserId(user_id);
        return res.json(gamers);
      }

      const gamers = await this.service.getAllGamers();
      return res.json(gamers);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener juegos' });
    }
  }

  async getGamerById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const gamer = await this.service.getGamerById(id);

      if (!gamer) {
        return res.status(404).json({ error: 'Juego no encontrado' });
      }

      return res.json(gamer);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener juego' });
    }
  }

  async updateGamer(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const { user_id, titulo, genero, descripcion, plataforma, precio } = req.body;

      const updated: Gamer = {
        id,
        user_id,
        titulo,
        genero,
        descripcion,
        plataforma,
        precio,
      };

      await this.service.updateGamer(updated);
      return res.json({ mensaje: 'Juego actualizado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar juego' });
    }
  }

  async deleteGamer(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      await this.service.deleteGamer(id);
      return res.json({ mensaje: 'Juego eliminado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar juego' });
    }
  }
}