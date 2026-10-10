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
let Review = class Review {
    id;
    rating;
    comment;
    date;
    status;
    userId;
    restaurantId;
    user;
    restaurant;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Review.prototype, "date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Review.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Review.prototype, "userId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Review.prototype, "restaurantId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.reviews),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", Object)
], Review.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews),
    JoinColumn({ name: 'restaurantId' }),
    __metadata("design:type", Object)
], Review.prototype, "restaurant", void 0);
Review = __decorate([
    Entity()
], Review);
export { Review };
//# sourceMappingURL=review.entity.js.map