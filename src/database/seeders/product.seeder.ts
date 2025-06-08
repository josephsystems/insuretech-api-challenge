import { Injectable } from '@nestjs/common';
import { ProductService } from '../../product/product.service';

@Injectable()
export class ProductSeederService {
  constructor(private readonly productService: ProductService) {}

  async seed() {
    try {
      // seed products
      await this.productService.seed();
    } catch (error) {
      console.error('Product seeding failed:', error);
      throw error;
    }
  }
}
