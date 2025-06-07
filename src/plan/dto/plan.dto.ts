import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { UserIdDto } from '../../shared/dto/base.dto';

export class PlanDto extends UserIdDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  productId?: number;
}
