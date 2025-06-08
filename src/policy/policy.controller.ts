import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterPolicyDto } from './dto/filter-policy.dto';
import { PolicyService } from './policy.service';
import { plainToClass } from 'class-transformer';
import { SerializedPolicy } from '../shared/serializers/policy.serializer';

@Controller('policies')
@UsePipes(new ValidationPipe())
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  async getPolicies(@Query() filterPolicyDto: FilterPolicyDto) {
    const policies = await this.policyService.getPolicies(filterPolicyDto);

    return {
      message: 'Policies fetched successfully',
      policies: plainToClass(SerializedPolicy, policies),
    };
  }

  @Get(':id')
  async getPolicy(
    @Param('id') id: number,
    @Query() filterPolicyDto: FilterPolicyDto,
  ) {
    const policy = await this.policyService.getPolicy(id, filterPolicyDto);

    return {
      message: 'Policy fetched successfully',
      policy: plainToClass(SerializedPolicy, policy),
    };
  }
}
