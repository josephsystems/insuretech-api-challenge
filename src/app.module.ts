import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PlanModule } from './plan/plan.module';
import { PendingPolicyModule } from './pending-policy/pending-policy.module';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    UserModule,
    PlanModule,
    PendingPolicyModule,
    PolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
