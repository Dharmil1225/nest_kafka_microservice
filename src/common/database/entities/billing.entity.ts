import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderEntity } from './order.entity';
@Entity('Billing')
export class BillingEntity extends BaseEntity {
  @Column()
  amount: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  order: OrderEntity;
}
