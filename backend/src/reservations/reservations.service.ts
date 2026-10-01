// Imports
import { CreateReservationDto } from "./dto/create-reservation.dto.js";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "./entities/reservation.entity.js";
import { Repository } from "typeorm";
import { UpdateReservationDto } from "./dto/update-reservation.dto.js";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ) {}

    async findAll(): Promise<Reservation[]> {
        return this.reservationRepository.find({
            relations: { user: true, restaurant: true }
        })
    }

    async findOne(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: { user: true, restaurant: true }
        });
        if (!reservation) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }
        return reservation;
    }

    async findByStatus(status: string): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find({
            where: { status: status },
            relations: { user: true, restaurant: true }
        });
        return reservations;
    }

    async findByRestaurantId(restaurantId: number): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find({
            where: { restaurantId: restaurantId },
            relations: { user: true, restaurant: true }
        });
        return reservations;
    }

    async findByUserId(userId: number): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find({
            where: { userId },
            relations: { user: true, restaurant: true }
        });
        return reservations;
    }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = this.reservationRepository.create({
            ...createReservationDto,
            status: createReservationDto.status || 'pending',
            specialRequest: createReservationDto.specialRequest ?? '',
        });
        return this.reservationRepository.save(reservation)
    }

    async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
        const reservation = await this.findOne(id);
        const updateReservation = this.reservationRepository.merge(reservation, updateReservationDto);
        return this.reservationRepository.save(updateReservation)
    }

    async delete(id: number): Promise<void> {
        const reservation = await this.findOne(id);
        await this.reservationRepository.remove(reservation);
    }

    
}