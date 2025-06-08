import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './entities/policy.entity';
import { UserModule } from 'src/user/user.module';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Policy]), UserModule],
  controllers: [PolicyController],
  providers: [PolicyService],
  exports: [PolicyService],
})
export class PolicyModule {}
