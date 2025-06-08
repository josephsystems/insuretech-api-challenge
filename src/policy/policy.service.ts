import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterPolicyDto } from './dto/filter-policy.dto';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    private readonly userService: UserService,
  ) {}
  async findPolicyById(id: number) {
    const policy = await this.policyRepository.findOne({ where: { id } });

    if (!policy) {
      throw new NotFoundException('Policy does not exist');
    }

    return policy;
  }

  async getPolicy(id: number, filterPolicyDto: FilterPolicyDto) {
    const { userId } = filterPolicyDto;
    const user = await this.userService.findUserById(userId);

    const policy = await this.findPolicyById(id);

    if (user.id != policy.user.id || user.email != policy.beneficiaryEmail) {
      throw new BadRequestException('Policy does not belong to user');
    }

    return policy;
  }

  async getPolicies(filterPolicyDto: FilterPolicyDto) {
    const { userId, beneficiary, mine } = filterPolicyDto;
    const user = await this.userService.findUserById(userId);

    const query = this.policyRepository
      .createQueryBuilder('policies')
      .leftJoinAndSelect('policies.product', 'product')
      .leftJoinAndSelect('policies.user', 'user');

    if (beneficiary) {
      query.where('policies.beneficiaryEmail = :beneficiaryEmail', {
        beneficiaryEmail: user.email,
      });
    } else if (mine) {
      query.where('policies.userId = :userId', { userId: user.id });
    } else {
      query.where('policies.userId = :userId', { userId: user.id });
      query.orWhere('policies.beneficiaryEmail = :beneficiaryEmail', {
        beneficiaryEmail: user.email,
      });
    }

    const policies = await query.getMany();

    return policies;
  }
}
