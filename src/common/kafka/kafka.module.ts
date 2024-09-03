import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { OrderServiceService } from '../../modules/order-service/order-service.service';

@Module({
  providers: [KafkaService, OrderServiceService],
  exports: [KafkaService],
})
export class KafkaModule {}
