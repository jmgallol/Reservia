import { HomeModule } from './home/home.module.js'
import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HomeModule,
    RestaurantsModule,
  ],
})
export class AppModule {}
