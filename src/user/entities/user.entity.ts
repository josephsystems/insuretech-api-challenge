import { Plan } from '../../plan/entities/plan.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'int', default: 0 })
  wallet: number; // Saved in kobo

  @OneToMany(() => Plan, (plan) => plan.user, { cascade: true })
  plans: Plan[];
}
