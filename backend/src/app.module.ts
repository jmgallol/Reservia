import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module.js';
import { UsersModule } from './users/users.module.js';
import { ReservationsModule } from './reservations/reservations.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: false,
    }),
    RestaurantsModule,
    UsersModule,
    ReservationsModule,
    ReviewsModule,
  ],
})
export class AppModule { }
