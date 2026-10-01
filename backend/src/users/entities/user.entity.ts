import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  RelationId
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string

    @Column({ type: 'varchar'})
    email: string;

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    role: 'client' | 'admin';

    @Column({ type: 'int', nullable: true })
    restaurantId: number;

    @OneToOne(() => Restaurant, (restaurant) => restaurant.user)
    restaurant: Relation<Restaurant>;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Relation<Reservation[]>;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Relation<Review[]>;
    
}