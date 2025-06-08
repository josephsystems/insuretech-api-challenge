import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PendingPolicy } from './entities/pending-policy.entity';
import { PendingPolicyStatus } from './enums';
import { UserService } from '../user/user.service';
import { ActivatePendingPolicyDto } from './dto/activate-pending-policy.dto';
import { Policy } from '../policy/entities/policy.entity';
import { PendingPolicyDto } from './dto/pending-policy.dto';
import { PlanService } from '../plan/plan.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class PendingPolicyService {
  constructor(
    @InjectRepository(PendingPolicy)
    private readonly pendingPolicyRepository: Repository<PendingPolicy>,
    private readonly productService: ProductService,
    private readonly planService: PlanService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async findPendingPolicyById(id: number, relations: string[] = []) {
    const pendingPolicy = await this.pendingPolicyRepository.findOne({
      where: { id },
      relations,
    });

    if (!pendingPolicy) {
      throw new NotFoundException('Pending policy not found');
    }

    return pendingPolicy;
  }

  async getPendingPolicies(pendingPolicyDto: PendingPolicyDto) {
    const { userId } = pendingPolicyDto;
    const user = await this.userService.findUserById(userId);

    const query = this.pendingPolicyRepository
      .createQueryBuilder('pendingPolicy')
      .leftJoinAndSelect('pendingPolicy.plan', 'plan')
      .leftJoinAndSelect('plan.product', 'product')
      .leftJoinAndSelect('plan.user', 'user')
      .where('user.id = :userId', { userId: user.id });

    // Only return unused pending policies
    query.andWhere('pendingPolicy.status = :status', {
      status: PendingPolicyStatus.UNUSED,
    });

    const pendingPolicies = await query.getMany();

    return pendingPolicies;
  }

  async getPendingPoliciesByPlan(
    planId: number,
    pendingPolicyDto: PendingPolicyDto,
  ) {
    const { userId, status } = pendingPolicyDto;
    const user = await this.userService.findUserById(userId);

    // Verify the plan exists and belongs to the user
    const plan = await this.planService.findPlanById(planId, ['user']);

    if (plan.user.id !== user.id) {
      throw new BadRequestException('Plan does not belong to user');
    }

    const query = this.pendingPolicyRepository
      .createQueryBuilder('pendingPolicy')
      .leftJoin('pendingPolicy.plan', 'plan')
      .where('plan.id = :planId', { planId });

    // Filter by status if provided, otherwise return all
    if (status) {
      query.andWhere('pendingPolicy.status = :status', { status });
    }

    const pendingPolicies = await query.getMany();

    let product = null;
    if (pendingPolicies.length > 0) {
      product = await this.productService.findProductByPlanId(planId);
    }

    return {
      pendingPolicies,
      product,
    };
  }

  async getPendingPolicy(id: number, pendingPolicyDto: PendingPolicyDto) {
    const { userId } = pendingPolicyDto;
    const user = await this.userService.findUserById(userId);

    const pendingPolicy = await this.findPendingPolicyById(id, [
      'plan',
      'plan.product',
      'plan.user',
    ]);

    if (pendingPolicy.plan.user.id !== user.id) {
      throw new BadRequestException('Pending policy does not belong to user');
    }

    // Transform to include the product directly
    return {
      ...pendingPolicy,
      product: pendingPolicy.plan.product,
    };
  }

  async activatePendingPolicy(
    id: number,
    activateDto: ActivatePendingPolicyDto,
    pendingPolicyDto: PendingPolicyDto,
  ) {
    const { beneficiaryEmail } = activateDto;
    const { userId } = pendingPolicyDto;
    const user = await this.userService.findUserById(userId);

    try {
      // Use transaction to ensure atomicity
      return await this.dataSource.transaction(async (manager) => {
        const pendingPolicyLock = await manager.findOne(PendingPolicy, {
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!pendingPolicyLock) {
          throw new NotFoundException('Pending policy not found');
        }

        const pendingPolicy = await manager.findOne(PendingPolicy, {
          where: { id },
          relations: ['plan', 'plan.product', 'plan.user'],
        });

        if (pendingPolicy.plan.user.id !== user.id) {
          throw new BadRequestException(
            'Pending policy does not belong to user',
          );
        }

        if (pendingPolicy.status === PendingPolicyStatus.USED) {
          throw new BadRequestException('Pending policy already used');
        }

        // Check if the beneficiary already has a policy with the same product
        const existingPolicy = await manager
          .createQueryBuilder(Policy, 'policy')
          .innerJoin('policy.product', 'product')
          .where('policy.beneficiaryEmail = :email', {
            email: beneficiaryEmail,
          })
          .andWhere('product.id = :productId', {
            productId: pendingPolicy.plan.product.id,
          })
          .getOne();

        if (existingPolicy) {
          throw new BadRequestException(
            'Beneficiary already has a policy for this product',
          );
        }

        // Create policy
        const policy = manager.create(Policy, {
          beneficiaryEmail,
          product: pendingPolicy.plan.product,
          user,
          pendingPolicy,
        });

        // Update pending policy status
        pendingPolicy.status = PendingPolicyStatus.USED;
        await manager.save(PendingPolicy, pendingPolicy);

        // Save policy
        const savedPolicy = await manager.save(Policy, policy);

        // Fetch the saved policy with product relation
        const policyWithProduct = await manager.findOne(Policy, {
          where: { id: savedPolicy.id },
          relations: ['product', 'user', 'pendingPolicy'],
        });

        return policyWithProduct;
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException(
        `An unexpected error occurred: ${error.message}`,
      );
    }
  }
}
