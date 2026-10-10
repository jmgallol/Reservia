import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column()
  date: string;

  @Column()
  status: string;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Relation<Restaurant>;
}
