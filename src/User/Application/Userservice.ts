// Application/UserService.ts
import { User } from '../Domain/Entities/User';
import { UserRepository } from '../Domain/Repositories/UserRepository';

export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(user: User) {
    const createdUser = await this.repository.create(user);
    return createdUser;
  }

  getUserById(id: string) {
    return this.repository.getById(id);
  }

  getUserByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

  getAllUsers() {
    return this.repository.getAll();
  }

  updateUser(user: User) {
    return this.repository.update(user);
  }

  deleteUser(id: string) {
    return this.repository.delete(id);
  }
}