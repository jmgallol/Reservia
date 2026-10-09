import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller.js"
import { RestaurantsService } from "./restaurants.service.js"
import { Restaurant } from "./entities/restaurant.entity.js"
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])],
    controllers: [RestaurantsController],
    providers: [RestaurantsService],
})
export class RestaurantsModule {}

