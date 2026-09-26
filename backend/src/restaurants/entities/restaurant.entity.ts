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

// Importaciones de relaciones (arrojarán error hasta que se creen los archivos)
// import { User } from '../../users/entities/user.entity.js';
// import { Reservation } from '../../reservations/entities/reservation.entity.js';
// import { Review } from '../../reviews/entities/review.entity.js';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
  
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  openingTime: string;

  @Column({ type: 'varchar' })
  closingTime: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'int', nullable: true })
  adminId: number;

  /*
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Relation<Reservation[]>;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Relation<Review[]>;
  */
}