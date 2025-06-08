import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanDto } from './dto/plan.dto';
import { SerializedPlan } from '../shared/serializers/plan.serializer';
import { plainToClass } from 'class-transformer';
import { PendingPolicyService } from '../pending-policy/pending-policy.service';
import { SerializedPendingPolicy } from '../shared/serializers/pending-policy.serializer';
import { PendingPolicyDto } from '../pending-policy/dto/pending-policy.dto';
import { SerializedProduct } from '../shared/serializers/product.serializer';

@Controller('plans')
@UsePipes(new ValidationPipe({ transform: true }))
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    private readonly pendingPolicyService: PendingPolicyService,
  ) {}

  @Post()
  async createPlan(
    @Body() createPlanDto: CreatePlanDto,
    @Query() filterPlanDto: PlanDto,
  ) {
    const plan = await this.planService.create(createPlanDto, filterPlanDto);

    return {
      message: 'Plan created successfully',
      result: plainToClass(SerializedPlan, plan),
    };
  }

  @Get()
  async getPlans(@Query() filterPlanDto: PlanDto) {
    const plans = await this.planService.getPlans(filterPlanDto);

    return {
      message: 'Plans fetched successfully',
      result: plainToClass(SerializedPlan, plans),
    };
  }

  @Get(':id/pending-policies')
  async getPendingPoliciesByPlan(
    @Param('id') planId: number,
    @Query() pendingPolicyDto: PendingPolicyDto,
  ) {
    const pendingPolicies =
      await this.pendingPolicyService.getPendingPoliciesByPlan(
        planId,
        pendingPolicyDto,
      );

    return {
      message: 'Plan pending policies fetched successfully',
      result: {
        pendingPolicies: plainToClass(
          SerializedPendingPolicy,
          pendingPolicies.pendingPolicies,
        ),
        product: plainToClass(SerializedProduct, pendingPolicies.product),
      },
    };
  }

  @Get(':id')
  async getPlan(@Param('id') id: number, @Query() planDto: PlanDto) {
    const plan = await this.planService.getPlan(id, planDto);

    return {
      message: 'Plan retrieved successfully',
      result: plainToClass(SerializedPlan, plan),
    };
  }
}
