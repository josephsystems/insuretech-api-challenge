import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserSeederService } from './database/seeders/user.seeder';
import { ProductSeederService } from './database/seeders/product.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userSeederService = app.get(UserSeederService);
  const productSeederService = app.get(ProductSeederService);

  try {
    await Promise.all([userSeederService.seed(), productSeederService.seed()]);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
