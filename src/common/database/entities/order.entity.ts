import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
@Entity('Order')
export class OrderEntity extends BaseEntity {
  @Column()
  product: string;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
