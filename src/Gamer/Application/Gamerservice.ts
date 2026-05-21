// Application/GamerService.ts
import { Gamer } from '../Domain/Entities/Gamer';
import { GamerRepository } from '../Domain/Repositories/GamerRepository';

export class GamerService {
  constructor(private repository: GamerRepository) {}

  async createGamer(gamer: Gamer) {
    const createdGamer = await this.repository.create(gamer);
    return createdGamer;
  }

  getGamerById(id: string) {
    return this.repository.getById(id);
  }

  getAllGamers() {
    return this.repository.getAll();
  }

  updateGamer(gamer: Gamer) {
    return this.repository.update(gamer);
  }

  deleteGamer(id: string) {
    return this.repository.delete(id);
  }
}