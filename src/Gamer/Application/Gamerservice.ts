import { Gamer } from '../Domain/Entities/Gamer';
import { GamerRepository } from '../Domain/Repositories/GamerRepository';

export class GamerService {
  constructor(private repository: GamerRepository) {}

  createGamer(gamer: Gamer) {
    return this.repository.create(gamer);
  }

  getGamerById(id: string) {
    return this.repository.getById(id);
  }

  getAllGamers() {
    return this.repository.getAll();
  }

  getGamersByUserId(user_id: string) {
    return this.repository.getByUserId(user_id);
  }

  updateGamer(gamer: Gamer) {
    return this.repository.update(gamer);
  }

  deleteGamer(id: string) {
    return this.repository.delete(id);
  }
}