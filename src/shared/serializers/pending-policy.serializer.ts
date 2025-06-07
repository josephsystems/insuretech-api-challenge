import { Expose } from 'class-transformer';

export class SerializedPendingPolicy {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  status: string;
}
