import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ApiKey extends BaseEntity {
  @PrimaryColumn()
  key: string;
}
