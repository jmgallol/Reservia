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
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'varchar' })
  time: string;

  @Column({ type: 'int' })
  numberOfPeople: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  specialRequest: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  restaurantId: number;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Relation<Restaurant>;
}
