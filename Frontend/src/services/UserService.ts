// Internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { BaseService } from '@/services/BaseService';

export class UserService extends BaseService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/users`;

  static getAll(): Promise<UserInterface[]> {
    return this.makeRequest(this.API_URL);
  }

  static getById(id: number): Promise<UserInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`);
  }

  static create(dto: CreateUserDTO): Promise<UserInterface> {
    return this.makeRequest(this.API_URL, false, 'post', dto);
  }
}
