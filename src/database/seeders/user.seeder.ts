import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    try {
      // Seed users
      await this.userService.seed();

      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
