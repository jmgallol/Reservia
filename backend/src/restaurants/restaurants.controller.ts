import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto.js";
import { Restaurant } from "./entities/restaurant.entity.js"
import { RestaurantsService } from "./restaurants.service.js";

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    findAll(
        @Query('query') query?: string,
        @Query('city') city?: string,
        @Query('category') category?: string,
    ): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query, city, category);
    }

    @Get('cities')
    getCities(): Promise<string[]> {
        return this.restaurantsService.getCities();
    }

    @Get('categories')
    getCategories(): Promise<string[]> {
        return this.restaurantsService.getCategories();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Restaurant> {
        return this.restaurantsService.findOne(id);
    }

    @Post()
    create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRestaurantDto: CreateRestaurantDto,
    ): Promise<Restaurant> {
        return this.restaurantsService.update(id, updateRestaurantDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.restaurantsService.remove(id);
    }
}