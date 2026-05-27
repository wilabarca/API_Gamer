import { Gamer } from '../Entities/Gamer';

export interface GamerRepository {
  create(gamer: Gamer): Promise<Gamer>;
  getById(id: string): Promise<Gamer | null>;
  getAll(): Promise<Gamer[]>;
  getByUserId(user_id: string): Promise<Gamer[]>;
  update(gamer: Gamer): Promise<Gamer>;
  delete(id: string): Promise<void>;
}