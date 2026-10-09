var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';
let Restaurant = class Restaurant {
    id;
    name;
    description;
    address;
    averageRating;
    city;
    category;
    openingTime;
    closingTime;
    imageUrl;
    latitude;
    longitude;
    adminId;
    user;
    reservations;
    reviews;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "city", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "category", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "openingTime", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "closingTime", void 0);
__decorate([
    Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Restaurant.prototype, "imageUrl", void 0);
__decorate([
    Column({ type: 'float' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "latitude", void 0);
__decorate([
    Column({ type: 'float' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "adminId", void 0);
__decorate([
    OneToOne(() => User, (user) => user.restaurant, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'adminId' }),
    __metadata("design:type", Object)
], Restaurant.prototype, "user", void 0);
__decorate([
    OneToMany(() => Reservation, (reservation) => reservation.restaurant),
    __metadata("design:type", Object)
], Restaurant.prototype, "reservations", void 0);
__decorate([
    OneToMany(() => Review, (review) => review.restaurant),
    __metadata("design:type", Object)
], Restaurant.prototype, "reviews", void 0);
Restaurant = __decorate([
    Entity()
], Restaurant);
export { Restaurant };
//# sourceMappingURL=restaurant.entity.js.map