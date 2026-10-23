import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module.js';
import { UsersModule } from './users/users.module.js';
import { ReservationsModule } from './reservations/reservations.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { InitialMigration1791660553636 } from './migrations/1791660553636-InitialMigration.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      migrations: [InitialMigration1791660553636],
    }),
    RestaurantsModule,
    UsersModule,
    ReservationsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
