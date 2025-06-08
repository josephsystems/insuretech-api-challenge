import { Plan } from './plan.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { PendingPolicy } from '../../pending-policy/entities/pending-policy.entity';

describe('Plan Entity', () => {
  let plan: Plan;
  let user: User;
  let product: Product;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.email = 'test@example.com';

    product = new Product();
    product.id = 1;
    product.name = 'Test Product';

    plan = new Plan();
    plan.id = 1;
    plan.quantity = 2;
    plan.user = user;
    plan.product = product;
    plan.pendingPolicies = [];
    plan.createdAt = new Date();
    plan.updatedAt = new Date();
  });

  it('should create a valid plan entity', () => {
    expect(plan).toBeDefined();
    expect(plan.id).toBe(1);
    expect(plan.quantity).toBe(2);
    expect(plan.user).toBe(user);
    expect(plan.product).toBe(product);
    expect(plan.pendingPolicies).toEqual([]);
    expect(plan.createdAt).toBeInstanceOf(Date);
    expect(plan.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a many-to-one relationship with user', () => {
    expect(plan.user).toBe(user);
    expect(plan.user.id).toBe(1);
    expect(plan.user.email).toBe('test@example.com');
  });

  it('should have a many-to-one relationship with product', () => {
    expect(plan.product).toBe(product);
    expect(plan.product.id).toBe(1);
    expect(plan.product.name).toBe('Test Product');
  });

  it('should have a one-to-many relationship with pending policies', () => {
    const pendingPolicy1 = new PendingPolicy();
    pendingPolicy1.id = 1;

    const pendingPolicy2 = new PendingPolicy();
    pendingPolicy2.id = 2;

    plan.pendingPolicies = [pendingPolicy1, pendingPolicy2];

    expect(plan.pendingPolicies).toHaveLength(2);
    expect(plan.pendingPolicies[0]).toBeInstanceOf(PendingPolicy);
    expect(plan.pendingPolicies[0].id).toBe(1);
    expect(plan.pendingPolicies[1].id).toBe(2);
  });
});
