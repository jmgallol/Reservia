import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service.js';
import { AppDataSource } from '../../data-source.js';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  providers: [SeedService],
})
export class SeedModule {}
