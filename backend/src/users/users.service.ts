// Imports
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { LoginDto } from "./dto/login.dto.js";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) {
            throw new NotFoundException(
                `User with ID ${id} not found`
            )
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async login(loginDto: LoginDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ 
            email: loginDto.email,
            password: loginDto.password
        });
        
        if (!user) {
            throw new NotFoundException('Correo o contraseña incorrectos');
        }
        
        return user;
    }
}