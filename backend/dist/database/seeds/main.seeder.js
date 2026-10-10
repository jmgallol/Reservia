import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module.js';
import { SeedService } from './seed.service.js';
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeedModule);
    const seedService = app.get(SeedService);
    try {
        await seedService.run();
    }
    catch (error) {
        console.error('Seeding failed!', error);
    }
    finally {
        await app.close();
    }
}
void bootstrap();
//# sourceMappingURL=main.seeder.js.map