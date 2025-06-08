import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    try {
      // Seed users
      await this.userService.seed();
    } catch (error) {
      console.error('User seeding failed:', error);
      throw error;
    }
  }
}
