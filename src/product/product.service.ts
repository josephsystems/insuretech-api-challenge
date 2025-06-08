import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { toKobo } from '../shared/utils/currency';
import { Currency, ProductCategory } from './enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    createProductDto.price = Number(toKobo(createProductDto.price));
    const product = this.productRepository.create(createProductDto);

    return await this.productRepository.save(product);
  }

  async findProducts(filterDto?: FilterProductDto) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filterDto) {
      if (filterDto.category) {
        queryBuilder.andWhere('product.category = :category', {
          category: filterDto.category,
        });
      }

      if (filterDto.minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', {
          minPrice: toKobo(filterDto.minPrice),
        });
      }

      if (filterDto.maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: toKobo(filterDto.maxPrice),
        });
      }
    }

    return await queryBuilder.getMany();
  }

  async findProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    if (updateProductDto.price) {
      updateProductDto.price = Number(toKobo(updateProductDto.price));
    }

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.update(id, updateProductDto);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.delete(id);
  }

  async findProductByPlanId(planId: number) {
    const product = await this.productRepository.findOne({
      where: { plans: { id: planId } },
    });

    return product;
  }

  async seed() {
    const productCount = await this.productRepository.count();

    if (productCount > 0) {
      console.log('Products already exist, skipping seed');
      return;
    }

    const productsData = [
      {
        name: 'Optimal care mini',
        description: '',
        price: 1000000, // 10000 NGN in Kobo
        currency: Currency.NGN,
        category: ProductCategory.HEALTH,
      },
      {
        name: 'Optimal care standard',
        description: '',
        price: 2000000, // 20000 NGN in Kobo
        currency: Currency.NGN,
        category: ProductCategory.HEALTH,
      },
      {
        name: 'Third-party',
        description: '',
        price: 500000, // 5000 NGN in Kobo
        currency: Currency.NGN,
        category: ProductCategory.AUTO,
      },
      {
        name: 'Comprehensive',
        description: '',
        price: 1500000, // 15000 NGN in Kobo
        currency: Currency.NGN,
        category: ProductCategory.AUTO,
      },
    ];

    console.log('Seeding products...');

    const products = [];
    for (const productData of productsData) {
      const product = this.productRepository.create(productData);
      products.push(product);
    }

    await this.productRepository.save(products);
    console.log('Product seeding completed successfully');
  }
}
