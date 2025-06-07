import { Module, forwardRef } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { UserModule } from '../user/user.module';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingPolicyModule } from '../pending-policy/pending-policy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    UserModule,
    forwardRef(() => PendingPolicyModule),
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
