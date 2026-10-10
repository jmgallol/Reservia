var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity.js';
import { Repository } from 'typeorm';
let ReservationsService = class ReservationsService {
    reservationRepository;
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async getAll() {
        return this.reservationRepository.find({
            relations: { user: true, restaurant: true },
        });
    }
    async getById(id) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: { user: true, restaurant: true },
        });
        if (!reservation) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }
        return reservation;
    }
    async getByStatus(status) {
        const reservations = await this.reservationRepository.find({
            where: { status: status },
            relations: { user: true, restaurant: true },
        });
        return reservations;
    }
    async getByRestaurantId(restaurantId) {
        const reservations = await this.reservationRepository.find({
            where: { restaurantId: restaurantId },
            relations: { user: true, restaurant: true },
        });
        return reservations;
    }
    async getByUserId(userId) {
        const reservations = await this.reservationRepository.find({
            where: { userId },
            relations: { user: true, restaurant: true },
        });
        return reservations;
    }
    async create(createReservationDto) {
        const reservation = this.reservationRepository.create({
            date: createReservationDto.date,
            time: createReservationDto.time,
            numberOfPeople: createReservationDto.numberOfPeople,
            userId: createReservationDto.userId,
            restaurantId: createReservationDto.restaurantId,
            status: createReservationDto.status || 'pending',
            specialRequest: createReservationDto.specialRequest ?? '',
        });
        return this.reservationRepository.save(reservation);
    }
    async update(id, updateReservationDto) {
        const reservation = await this.getById(id);
        const updateReservation = this.reservationRepository.merge(reservation, updateReservationDto);
        return this.reservationRepository.save(updateReservation);
    }
    async delete(id) {
        const reservation = await this.getById(id);
        await this.reservationRepository.remove(reservation);
    }
};
ReservationsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Reservation)),
    __metadata("design:paramtypes", [Repository])
], ReservationsService);
export { ReservationsService };
//# sourceMappingURL=reservations.service.js.map