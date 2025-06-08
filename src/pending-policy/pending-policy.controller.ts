import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PendingPolicyService } from './pending-policy.service';
import { PendingPolicyDto } from './dto/pending-policy.dto';
import { ActivatePendingPolicyDto } from './dto/activate-pending-policy.dto';
import { SerializedPendingPolicy } from '../shared/serializers/pending-policy.serializer';
import { SerializedPolicy } from '../shared/serializers/policy.serializer';
import { plainToClass } from 'class-transformer';

@Controller('pending-policies')
@UsePipes(new ValidationPipe({ transform: true }))
export class PendingPolicyController {
  constructor(private readonly pendingPolicyService: PendingPolicyService) {}

  @Get()
  async getPendingPolicies(@Query() pendingPolicyDto: PendingPolicyDto) {
    const pendingPolicies =
      await this.pendingPolicyService.getPendingPolicies(pendingPolicyDto);

    return {
      message: 'Pending policies fetched successfully',
      result: plainToClass(SerializedPendingPolicy, pendingPolicies),
    };
  }

  @Get(':id')
  async getPendingPolicy(
    @Param('id') id: number,
    @Query() pendingPolicyDto: PendingPolicyDto,
  ) {
    const pendingPolicy = await this.pendingPolicyService.getPendingPolicy(
      id,
      pendingPolicyDto,
    );

    return {
      message: 'Pending policy fetched successfully',
      result: plainToClass(SerializedPendingPolicy, pendingPolicy),
    };
  }

  @Post(':id/activate')
  async activatePendingPolicy(
    @Param('id') id: number,
    @Body() activateDto: ActivatePendingPolicyDto,
    @Query() pendingPolicyDto: PendingPolicyDto,
  ) {
    const policy = await this.pendingPolicyService.activatePendingPolicy(
      id,
      activateDto,
      pendingPolicyDto,
    );

    return {
      message: 'Pending policy activated successfully',
      result: plainToClass(SerializedPolicy, policy),
    };
  }
}

@Controller('plans/:planId/pending-policies')
@UsePipes(new ValidationPipe({ transform: true }))
export class PlanPendingPolicyController {
  constructor(private readonly pendingPolicyService: PendingPolicyService) {}

  @Get()
  async getPendingPoliciesByPlan(
    @Param('planId') planId: number,
    @Query() pendingPolicyDto: PendingPolicyDto,
  ) {
    const pendingPolicies =
      await this.pendingPolicyService.getPendingPoliciesByPlan(
        planId,
        pendingPolicyDto,
      );

    return {
      message: 'Plan pending policies fetched successfully',
      result: plainToClass(SerializedPendingPolicy, pendingPolicies),
    };
  }
}
