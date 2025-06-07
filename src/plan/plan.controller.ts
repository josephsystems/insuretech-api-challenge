import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanDto } from './dto/plan.dto';
import { SerializedPlan } from '../shared/serializers/plan.serializer';
import { plainToClass } from 'class-transformer';

@Controller('plans')
@UsePipes(new ValidationPipe({ transform: true }))
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async createPlan(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.planService.create(createPlanDto);

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

  @Get(':id')
  async getPlan(@Param('id') id: number, @Query() planDto: PlanDto) {
    const plan = await this.planService.getPlan(id, planDto);

    return {
      message: 'Plan retrieved successfully',
      result: plainToClass(SerializedPlan, plan),
    };
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: number, @Query() planDto: PlanDto) {
    await this.planService.deletePlan(id, planDto);

    return {
      message: 'Plan deleted successfully',
      result: null,
    };
  }
}
