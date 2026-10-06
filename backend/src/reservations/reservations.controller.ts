import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    Query, 
    ParseIntPipe, 
    HttpCode, 
    HttpStatus 
} from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto.js";
import { UpdateReservationDto } from "./dto/update-reservation.dto.js";
import { Reservation } from "./entities/reservation.entity.js";
import { ReservationsService } from "./reservations.service.js";

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Get()
    findAll(): Promise<Reservation[]> {
        return this.reservationsService.getAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
        return this.reservationsService.getById(id);
    }

    @Get('status')
    findByStatus(@Query('status') status: string): Promise<Reservation[]> {
        return this.reservationsService.getByStatus(status);
    }

    @Get('restaurant/:id')
    findByRestaurantId(@Param('id', ParseIntPipe) id:number): Promise<Reservation[]> {
        return this.reservationsService.getByRestaurantId(id);
    }
    
    @Get('user/:id')
    findByUserId(@Param('id', ParseIntPipe) id:number): Promise<Reservation[]> {
        return this.reservationsService.getByUserId(id);
    }

    @Post()
    create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
        return this.reservationsService.create(createReservationDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateReservationDto: UpdateReservationDto,
    ): Promise<Reservation> {
        return this.reservationsService.update(id, updateReservationDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.reservationsService.delete(id);
    }  
}