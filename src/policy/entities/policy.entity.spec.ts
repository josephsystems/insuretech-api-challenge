import { Policy } from './policy.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { PendingPolicy } from '../../pending-policy/entities/pending-policy.entity';

describe('Policy Entity', () => {
  let policy: Policy;
  let user: User;
  let product: Product;
  let pendingPolicy: PendingPolicy;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.email = 'test@example.com';

    product = new Product();
    product.id = 1;
    product.name = 'Test Product';

    pendingPolicy = new PendingPolicy();
    pendingPolicy.id = 1;

    policy = new Policy();
    policy.id = 1;
    policy.beneficiaryEmail = 'beneficiary@example.com';
    policy.user = user;
    policy.product = product;
    policy.pendingPolicy = pendingPolicy;
    policy.createdAt = new Date();
    policy.updatedAt = new Date();
  });

  it('should create a valid policy entity', () => {
    expect(policy).toBeDefined();
    expect(policy.id).toBe(1);
    expect(policy.beneficiaryEmail).toBe('beneficiary@example.com');
    expect(policy.user).toBe(user);
    expect(policy.product).toBe(product);
    expect(policy.pendingPolicy).toBe(pendingPolicy);
    expect(policy.createdAt).toBeInstanceOf(Date);
    expect(policy.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a many-to-one relationship with user', () => {
    expect(policy.user).toBe(user);
    expect(policy.user.id).toBe(1);
    expect(policy.user.email).toBe('test@example.com');
  });

  it('should have a many-to-one relationship with product', () => {
    expect(policy.product).toBe(product);
    expect(policy.product.id).toBe(1);
    expect(policy.product.name).toBe('Test Product');
  });

  it('should have a one-to-one relationship with pending policy', () => {
    expect(policy.pendingPolicy).toBe(pendingPolicy);
    expect(policy.pendingPolicy.id).toBe(1);
  });
});
