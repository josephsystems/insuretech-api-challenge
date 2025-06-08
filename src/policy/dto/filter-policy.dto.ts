import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserIdDto } from '../../shared/dto/base.dto';

export class FilterPolicyDto extends UserIdDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  beneficiary?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  mine?: boolean;
}
