import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class UserIdDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  userId: number;
}
