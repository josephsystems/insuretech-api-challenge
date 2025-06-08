import { Product } from './product.entity';
import { ProductCategory, Currency } from '../enum';
import { Plan } from '../../plan/entities/plan.entity';

describe('Product Entity', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product();
    product.id = 1;
    product.name = 'Optimal care mini';
    product.description = 'Test Description';
    product.price = 1000000; // 10000 Naira in Kobo
    product.category = ProductCategory.HEALTH;
    product.currency = Currency.NGN;
    product.plans = [];
    product.createdAt = new Date();
    product.updatedAt = new Date();
  });

  it('should create a valid product entity', () => {
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Optimal care mini');
    expect(product.description).toBe('Test Description');
    expect(product.price).toBe(1000000);
    expect(product.category).toBe(ProductCategory.HEALTH);
    expect(product.currency).toBe(Currency.NGN);
    expect(product.plans).toEqual([]);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a valid product category', () => {
    product.category = ProductCategory.HEALTH;
    expect(product.category).toBe(ProductCategory.HEALTH);

    product.category = ProductCategory.AUTO;
    expect(product.category).toBe(ProductCategory.AUTO);
  });

  it('should have a one-to-many relationship with plans', () => {
    const plan = new Plan();
    plan.id = 1;

    product.plans = [plan];

    expect(product.plans).toHaveLength(1);
    expect(product.plans[0]).toBeInstanceOf(Plan);
    expect(product.plans[0].id).toBe(1);
  });
});
