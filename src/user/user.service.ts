import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    const userCount = await this.userRepository.count();

    if (userCount === 0) {
      const users = [
        {
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          wallet: 1000000, // 10000 NGN in kobo
        },
        {
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          wallet: 2000000, // 20000 NGN in kobo
        },
      ];

      console.log('Seeding users...');
      for (const userData of users) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
      }

      console.log('User seeding completed successfully');
    } else {
      console.log('Users already exist, skipping seed');
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
