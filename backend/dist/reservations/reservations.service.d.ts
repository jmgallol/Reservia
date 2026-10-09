import { CreateReservationDto } from "./dto/create-reservation.dto.js";
import { Reservation } from "./entities/reservation.entity.js";
import { Repository } from "typeorm";
import { UpdateReservationDto } from "./dto/update-reservation.dto.js";
export declare class ReservationsService {
    private reservationRepository;
    constructor(reservationRepository: Repository<Reservation>);
    getAll(): Promise<Reservation[]>;
    getById(id: number): Promise<Reservation>;
    getByStatus(status: string): Promise<Reservation[]>;
    getByRestaurantId(restaurantId: number): Promise<Reservation[]>;
    getByUserId(userId: number): Promise<Reservation[]>;
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
    delete(id: number): Promise<void>;
}
