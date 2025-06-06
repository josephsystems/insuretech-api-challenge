import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  description: string;
}
