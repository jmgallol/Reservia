var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';
let Reservation = class Reservation {
    id;
    date;
    time;
    numberOfPeople;
    status;
    specialRequest;
    userId;
    restaurantId;
    user;
    restaurant;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Reservation.prototype, "date", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Reservation.prototype, "time", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "numberOfPeople", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Reservation.prototype, "specialRequest", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "userId", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "restaurantId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", Object)
], Reservation.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'restaurantId' }),
    __metadata("design:type", Object)
], Reservation.prototype, "restaurant", void 0);
Reservation = __decorate([
    Entity()
], Reservation);
export { Reservation };
//# sourceMappingURL=reservation.entity.js.map