import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from '../database/entities/user.entity';
import { OrderServiceService } from '../../modules/order-service/order-service.service';
import { OrderEntity } from '../database/entities/order.entity';
import { Repository } from 'typeorm';
import { BillingEntity } from '../database/entities/billing.entity';
import { connection } from '../database/database.module';

@Controller()
export class KafkaController {
  billingRepository: Repository<BillingEntity>;
  constructor(private readonly orderServiceService: OrderServiceService) {
    this.billingRepository = connection.getRepository(BillingEntity);
  }
  @MessagePattern('user.created')
  async handleUserCreated(@Payload() user: UserEntity) {
    console.log(`User created: ${user.name}`);
    this.orderServiceService.createOrder({
      product: 'Welcome Gift',
      amount: 0,
      userId: user.id,
    });
  }

  @MessagePattern('user.deleted')
  async handleUserDeleted(@Payload() user: UserEntity) {
    this.orderServiceService.deleteOrder(user.id);
  }

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() order: OrderEntity) {
    console.log(`Order created for billing: ${order.product}`);

    const existingBilling = await this.billingRepository.findOneBy({
      order: { id: order.id },
    });
    if (!existingBilling) {
      const billing = new BillingEntity();
      billing.amount = order.amount * 1.1;
      billing.order = order;
      await this.billingRepository.save(billing);
      console.log(`Billing created for order: ${order.product}`);
    } else {
      console.log(`Billing already exists for order: ${order.product}`);
    }
  }

  @MessagePattern('order.updated')
  async handleOrderUpdated(@Payload() order: OrderEntity) {
    console.log(`Order updated for billing: ${order.product}`);

    const billing = await this.billingRepository.findOne({
      where: { order: { id: order.id } },
    });
    if (billing) {
      billing.amount = order.amount * 1.1;
      await this.billingRepository.save(billing);
      console.log(`Billing updated for order: ${order.product}`);
    } else {
      console.log(
        `No billing record found for updated order: ${order.product}`,
      );
    }
  }

  @MessagePattern('order.deleted')
  async handleOrderDeleted(@Payload() order: { id: number }) {
    console.log(`Order deleted for billing: ${order.id}`);

    const result = await this.billingRepository.delete({
      order: { id: order.id as any },
    });
    if (result.affected > 0) {
      console.log(`Billing deleted for order with ID: ${order.id}`);
    } else {
      console.log(
        `No billing record found to delete for order ID: ${order.id}`,
      );
    }
  }
}
