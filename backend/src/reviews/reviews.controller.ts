import { 
    Controller,
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    Body, 
    Patch, 
    Delete,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { Review } from './entities/review.entity.js';
import { ReviewsService } from './reviews.service.js'; 

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    findAll(): Promise<Review[]> {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
        return this.reviewsService.findOne(id);
    }

    @Get('restaurant/:id')
    findByRestaurantId(@Param('id', ParseIntPipe) id:number): Promise<Review[]> {
        return this.reviewsService.findByRestaurantId(id);
    }

    @Get('user/:id')
    findByUserId(@Param('id', ParseIntPipe) id:number): Promise<Review[]> {
        return this.reviewsService.findByUserId(id);
    }

    @Post()
    create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsService.create(createReviewDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateReviewDto: UpdateReviewDto,
    ): Promise<Review> {
        return this.reviewsService.update(id, updateReviewDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.reviewsService.delete(id);
    }
}