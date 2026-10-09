import { CreateReservationDto } from "./dto/create-reservation.dto.js";
import { UpdateReservationDto } from "./dto/update-reservation.dto.js";
import { Reservation } from "./entities/reservation.entity.js";
import { ReservationsService } from "./reservations.service.js";
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    findByStatus(status: string): Promise<Reservation[]>;
    findByRestaurantId(id: number): Promise<Reservation[]>;
    findByUserId(id: number): Promise<Reservation[]>;
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
    remove(id: number): Promise<void>;
}
