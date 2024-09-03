import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../common/database/entities/order.entity';
import { KafkaService } from '../../common/kafka/kafka.service';
import { connection } from '../../common/database/database.module';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';

@Injectable()
export class OrderServiceService {
  ordersRepository: Repository<OrderEntity>;
  constructor(private readonly kafkaService: KafkaService) {
    this.ordersRepository = connection.getRepository(OrderEntity);
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    const savedOrder = await this.ordersRepository.save(order);
    this.kafkaService.emit('order.created', savedOrder);
    return savedOrder;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    await this.ordersRepository.update(id, updateOrderDto);
    const updatedOrder = await this.ordersRepository.findOneBy({ id });
    this.kafkaService.emit('order.updated', updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: string) {
    await this.ordersRepository.delete({ user: { id } });
    this.kafkaService.emit('order.deleted', { id });
  }

  async findAll() {
    return this.ordersRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    return this.ordersRepository.findOneBy({ id });
  }
}
