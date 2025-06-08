import { UserIdDto } from '../../shared/dto/base.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { PendingPolicyStatus } from '../enums';

export class PendingPolicyDto extends UserIdDto {
  @IsOptional()
  @IsEnum(PendingPolicyStatus)
  status?: PendingPolicyStatus;
}
