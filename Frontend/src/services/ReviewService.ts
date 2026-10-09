// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { BaseService } from '@/services/BaseService';

export class ReviewService extends BaseService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

  static getAll(): Promise<ReviewInterface[]> {
    return this.makeRequest(this.API_URL);
  }

  static getById(id: number): Promise<ReviewInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`);
  }

  static getByRestaurantId(id: number): Promise<ReviewInterface[]> {
    return this.makeRequest(`${this.API_URL}/restaurant/${id}`);
  }

  static getByUserId(userId: number): Promise<ReviewInterface[]> {
    return this.makeRequest(`${this.API_URL}/user/${userId}`);
  }

  static create(dto: CreateReviewDTO): Promise<ReviewInterface> {
    return this.makeRequest(this.API_URL, false, 'post', dto);
  }

  static update(id: number, dto: UpdateReviewDTO): Promise<ReviewInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'patch', dto);
  }

  static delete(id: number): Promise<void> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'delete');
  }
}
