import { Repository } from "typeorm";
import { User } from "./entities/user.entity.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<User>;
}
