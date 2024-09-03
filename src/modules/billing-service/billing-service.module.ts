import { Module } from '@nestjs/common';
import { BillingServiceService } from './billing-service.service';
import { BillingServiceController } from './billing-service.controller';
import { KafkaService } from '../../common/kafka/kafka.service';

@Module({
  controllers: [BillingServiceController],
  providers: [BillingServiceService, KafkaService],
})
export class BillingServiceModule {}
