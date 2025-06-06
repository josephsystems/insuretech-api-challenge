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
import { SerializedProduct } from 'src/shared/serializers/product.serializer';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return {
      message: 'Product ceated successfully',
      result: plainToClass(SerializedProduct, product),
    };
  }

  @Get()
  async findAll(@Query() filterDto: FilterProductDto) {
    const products = await this.productService.findAll(filterDto);

    return {
      message: 'Successfully retrieved products',
      result: plainToClass(SerializedProduct, products),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);

    return {
      message: 'Product successfully retrieved',
      result: plainToClass(SerializedProduct, product),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );

    return {
      message: 'Product updated successfully',
      result: plainToClass(SerializedProduct, updatedProduct),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);

    return {
      message: 'Product deleted successfully',
      result: null,
    };
  }
}
