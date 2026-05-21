// Infrastructure/Controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../../Application/Userservice';
import { User } from '../../Domain/Entities/User';

export class UserController {
  constructor(private service: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const user: User = {
        id: '',
        email,
        password,
      };

      await this.service.createUser(user);
      return res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.service.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const user = await this.service.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const { email, password } = req.body;

      const updated: User = {
        id,
        email,
        password,
      };

      await this.service.updateUser(updated);
      return res.json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      await this.service.deleteUser(id);
      return res.json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
}