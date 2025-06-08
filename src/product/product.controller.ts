import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { plainToClass } from 'class-transformer';
import { SerializedProduct } from '../shared/serializers/product.serializer';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);

    return {
      message: 'Product created successfully',
      result: plainToClass(SerializedProduct, product),
    };
  }

  @Get()
  async findProducts(@Query() filterDto: FilterProductDto) {
    const products = await this.productService.findProducts(filterDto);

    return {
      message: 'Successfully retrieved products',
      result: plainToClass(SerializedProduct, products),
    };
  }

  @Get(':id')
  async findProduct(@Param('id') id: number) {
    const product = await this.productService.findProduct(id);

    return {
      message: 'Product successfully retrieved',
      result: plainToClass(SerializedProduct, product),
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );

    return {
      message: 'Product updated successfully',
      result: plainToClass(SerializedProduct, updatedProduct),
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);

    return {
      message: 'Product deleted successfully',
      result: null,
    };
  }
}
