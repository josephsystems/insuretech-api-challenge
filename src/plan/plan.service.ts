import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Repository, DataSource } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Plan } from './entities/plan.entity';
import { PendingPolicy } from '../pending-policy/entities/pending-policy.entity';
import {
  calculateTotalCost,
  subtractBalance,
} from '../shared/utils/calculation';
import { toNaira } from '../shared/utils/currency';
import { PlanDto } from './dto/plan.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    private readonly userService: UserService,
    private readonly datasource: DataSource,
  ) {}
  async create(createPlanDto: CreatePlanDto, filterPlanDto: PlanDto) {
    const { productId, quantity } = createPlanDto;
    const { userId } = filterPlanDto;

    try {
      const plan = await this.datasource.transaction(async (manager) => {
        const user = await manager.findOne(User, {
          where: { id: userId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        const product = await manager.findOne(Product, {
          where: { id: productId },
          lock: { mode: 'pessimistic_read' },
        });

        if (!product) {
          throw new NotFoundException('Product does not exist');
        }

        // Calculate total cost in KOBO
        const totalCost = calculateTotalCost(product.price, quantity);

        if (user.wallet < totalCost) {
          throw new BadRequestException(
            `Insufficient balance. Required: ${toNaira(totalCost).toFixed(2)}, Available: ${toNaira(user.wallet).toFixed(2)}`,
          );
        }

        // Deduct balance
        user.wallet = subtractBalance(user.wallet, totalCost);
        await manager.save(User, user);

        // Create plan
        const plan = manager.create(Plan, {
          product,
          user,
          quantity,
        });

        const savedPlan = await manager.save(Plan, plan);

        // Create pending policies in batch for better performance
        const pendingPolicies = [];
        for (let i = 0; i < quantity; i++) {
          const pendingPolicy = manager.create(PendingPolicy, {
            plan: savedPlan,
          });
          pendingPolicies.push(pendingPolicy);
        }

        if (pendingPolicies.length) {
          await manager.save(PendingPolicy, pendingPolicies);
        }

        const completePlan = await manager.findOne(Plan, {
          where: { id: savedPlan.id },
          relations: ['product', 'user', 'pendingPolicies'],
        });

        return completePlan;
      });

      return plan;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      )
        throw error;
      console.log(error);
      throw new InternalServerErrorException(
        `An unexpected error occurred: ${error.message}`,
      );
    }
  }

  async getPlans(filterPlanDto: PlanDto) {
    const { userId, productId } = filterPlanDto;
    const user = await this.userService.findUserById(userId);

    const query = this.planRepository
      .createQueryBuilder('plan')
      .leftJoinAndSelect('plan.product', 'product')
      .leftJoinAndSelect('plan.user', 'user')
      .leftJoinAndSelect('plan.pendingPolicies', 'pendingPolicies');

    if (productId) {
      query.andWhere('plan.productId = :productId', { productId });
    }

    query.andWhere('plan.userId = :userId', { userId: user.id });

    return await query.getMany();
  }

  async findPlanById(id: number, relations: string[] = []) {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations,
    });

    if (!plan) {
      throw new NotFoundException('Plan does not exist');
    }

    return plan;
  }

  async getPlan(id: number, planDto: PlanDto) {
    const { userId } = planDto;
    const user = await this.userService.findUserById(userId);

    const plan = await this.findPlanById(id, [
      'product',
      'user',
      'pendingPolicies',
    ]);

    if (plan.user.email !== user.email) {
      throw new BadRequestException('Plan does not belong to user');
    }

    return plan;
  }
}
