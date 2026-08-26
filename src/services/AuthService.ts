import type { CreateAdminDTO } from '@/dtos/CreateAdminDTO';
import type { CreateClientDTO } from '@/dtos/CreateClientDTO';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import type { UserInterface } from '@/interfaces/UserInterface';

import { useAuthStore } from '@/stores/auth';

const USERS_KEY = 'reservia_users';
const RESTAURANTS_KEY = 'reservia_restaurants';

export class AuthService {
  static getUsers(): UserInterface[] {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getRestaurants(): RestaurantInterface[] {
    const data = localStorage.getItem(RESTAURANTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private static saveUsers(users: UserInterface[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private static saveRestaurants(restaurants: RestaurantInterface[]): void {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
  }

  private static generateId(items: { id: number }[]): number {
    if (items.length === 0) return 1;
    return Math.max(...items.map((item) => item.id)) + 1;
  }

  static login(email: string, password: string): UserInterface | undefined {
    const users = AuthService.getUsers();
    return users.find((user) => user.email === email && user.password === password);
  }

  static loginAndSave(email: string, password: string): UserInterface | undefined {
    const user = AuthService.login(email, password);
    if (user) {
      const store = useAuthStore();
      store.login(user);
    }
    return user;
  }

  static logoutUser(): void {
    const store = useAuthStore();
    store.logout();
  }

  static getCurrentUser(): UserInterface | null {
    const store = useAuthStore();
    return store.currentUser;
  }

  static isAuthenticated(): boolean {
    const store = useAuthStore();
    return store.isAuthenticated();
  }

  static registerClient(dto: CreateClientDTO): UserInterface {
    const users = AuthService.getUsers();

    const emailExists = users.some((user) => user.email === dto.email);
    if (emailExists) {
      throw new Error('Ya existe una cuenta con este correo electrónico.');
    }

    const newUser: UserInterface = {
      id: AuthService.generateId(users),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      role: 'client',
    };

    users.push(newUser);
    AuthService.saveUsers(users);
    return newUser;
  }

  static registerAdmin(dto: CreateAdminDTO): {
    user: UserInterface;
    restaurant: RestaurantInterface;
  } {
    const users = AuthService.getUsers();
    const restaurants = AuthService.getRestaurants();

    const emailExists = users.some((user) => user.email === dto.email);
    if (emailExists) {
      throw new Error('Ya existe una cuenta con este correo electrónico.');
    }

    const newUser: UserInterface = {
      id: AuthService.generateId(users),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      role: 'admin',
    };

    const newRestaurant: RestaurantInterface = {
      id: AuthService.generateId(restaurants),
      name: dto.restaurantName,
      address: dto.restaurantAddress,
      city: dto.restaurantCity,
      category: dto.restaurantCategory,
      adminId: newUser.id,
    };

    users.push(newUser);
    restaurants.push(newRestaurant);
    AuthService.saveUsers(users);
    AuthService.saveRestaurants(restaurants);

    return { user: newUser, restaurant: newRestaurant };
  }
}
