import { Module } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { OrderServiceController } from './order-service.controller';
import { KafkaService } from '../../common/kafka/kafka.service';

@Module({
  providers: [OrderServiceService, KafkaService],
  controllers: [OrderServiceController],
})
export class OrderServiceModule {}
