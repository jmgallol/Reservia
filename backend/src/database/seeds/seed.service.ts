import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly dataSource: DataSource) {}

  async run() {
    this.logger.log('Connecting to database and starting transaction...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log('Clearing old data...');
      await queryRunner.manager.clear(Review);
      await queryRunner.manager.clear(Reservation);
      await queryRunner.manager.clear(Restaurant);
      await queryRunner.manager.clear(User);

      this.logger.log('Creating users...');
      const clientUser = queryRunner.manager.create(User, {
        name: 'Cliente de Prueba',
        email: 'cliente@reservia.com',
        password: 'password123',
        phone: '3001234567',
        role: 'client',
      });
      await queryRunner.manager.save(clientUser);

      // Admins para cada restaurante (ya que la relación es 1 a 1)
      const adminFrisby = queryRunner.manager.create(User, {
        name: 'Admin Frisby',
        email: 'frisby@reservia.com',
        password: 'password123',
        phone: '3000000001',
        role: 'admin',
      });
      await queryRunner.manager.save(adminFrisby);

      const adminDominos = queryRunner.manager.create(User, {
        name: 'Admin Dominos',
        email: 'dominos@reservia.com',
        password: 'password123',
        phone: '3000000002',
        role: 'admin',
      });
      await queryRunner.manager.save(adminDominos);

      const adminCapira = queryRunner.manager.create(User, {
        name: 'Admin Papas Capira',
        email: 'capira@reservia.com',
        password: 'password123',
        phone: '3000000003',
        role: 'admin',
      });
      await queryRunner.manager.save(adminCapira);

      this.logger.log('Creating restaurants...');

      const rFrisby = queryRunner.manager.create(Restaurant, {
        name: 'Frisby',
        description:
          'El sabor que te encanta. El mejor pollo frito de la ciudad.',
        address: 'Calle 10 N° 43E - 135',
        city: 'Medellín',
        category: 'Pollo',
        openingTime: '10:00',
        closingTime: '22:00',
        imageUrl:
          'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
        latitude: 6.2120207,
        longitude: -75.5751497,
        adminId: adminFrisby.id,
      });
      await queryRunner.manager.save(rFrisby);
      adminFrisby.restaurantId = rFrisby.id;
      await queryRunner.manager.save(adminFrisby);

      const rDominos = queryRunner.manager.create(Restaurant, {
        name: 'Dominos Pizza',
        description:
          'Pizzas deliciosas recién salidas del horno, con entrega rápida.',
        address: 'Cra. 43C #67 sur - 26',
        city: 'Medellín',
        category: 'Pizzería',
        openingTime: '11:00',
        closingTime: '23:00',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591',
        latitude: 6.1517663,
        longitude: -75.6137165,
        adminId: adminDominos.id,
      });
      await queryRunner.manager.save(rDominos);
      adminDominos.restaurantId = rDominos.id;
      await queryRunner.manager.save(adminDominos);

      const rCapira = queryRunner.manager.create(Restaurant, {
        name: 'Papas Capira',
        description:
          'Las mejores papas fritas y comidas rápidas para compartir.',
        address: 'Cl 38 #75-00',
        city: 'Medellín',
        category: 'Comida Rápida',
        openingTime: '12:00',
        closingTime: '23:59',
        imageUrl:
          'https://images.unsplash.com/photo-1518013431117-eb1465fa5752',
        latitude: 6.2452481,
        longitude: -75.5974545,
        adminId: adminCapira.id,
      });
      await queryRunner.manager.save(rCapira);
      adminCapira.restaurantId = rCapira.id;
      await queryRunner.manager.save(adminCapira);

      this.logger.log('Creating reservations...');
      const reservation = queryRunner.manager.create(Reservation, {
        date: '2026-11-01',
        time: '19:00',
        numberOfPeople: 4,
        status: 'pending',
        specialRequest: 'Mesa grande por favor',
        userId: clientUser.id,
        restaurantId: rFrisby.id,
      });
      await queryRunner.manager.save(reservation);

      this.logger.log('Creating reviews...');
      const review = queryRunner.manager.create(Review, {
        rating: 5,
        comment: '¡El pollo estaba delicioso y muy crujiente!',
        date: '2026-10-10',
        status: 'published',
        userId: clientUser.id,
        restaurantId: rFrisby.id,
      });
      await queryRunner.manager.save(review);

      await queryRunner.commitTransaction();
      this.logger.log('Seeding completed successfully!');
    } catch (err) {
      this.logger.error('Error during seeding, rolling back...', err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
