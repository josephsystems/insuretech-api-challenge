import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingPolicy } from './entities/pending-policy.entity';
import { PendingPolicyController } from './pending-policy.controller';
import { PendingPolicyService } from './pending-policy.service';
import { UserModule } from '../user/user.module';
import { PlanModule } from '../plan/plan.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PendingPolicy]),
    UserModule,
    forwardRef(() => PlanModule),
    ProductModule,
  ],
  controllers: [PendingPolicyController],
  providers: [PendingPolicyService],
  exports: [PendingPolicyService],
})
export class PendingPolicyModule {}
