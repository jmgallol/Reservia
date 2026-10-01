export class CreateUserDto {
    name!: string;
    email!: string;
    password!: string;
    phone!: string;
    role!: 'client' | 'admin';
    restaurantId?: number;
}