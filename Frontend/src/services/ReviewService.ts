// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { UpdateReviewDTO } from '@/dtos/UpdateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import axios from 'axios';

export class ReviewService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

  static async getAll(): Promise<ReviewInterface[]> {
    try {
      const { data } = await axios.get(this.API_URL);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getById(id: number): Promise<ReviewInterface | undefined> {
    try {
      const { data } = await axios.get(`${this.API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async getByRestaurantId(id: number): Promise<ReviewInterface[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/restaurant/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getByUserId(userId: number): Promise<ReviewInterface[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/user/${userId}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async create(dto: CreateReviewDTO): Promise<ReviewInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, dto);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async update(id: number, dto: UpdateReviewDTO): Promise<ReviewInterface | undefined> {
    try {
      const { data } = await axios.patch(`${this.API_URL}/${id}`, dto);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}
