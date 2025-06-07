import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { toKobo } from 'src/shared/utils/currency';

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
}
