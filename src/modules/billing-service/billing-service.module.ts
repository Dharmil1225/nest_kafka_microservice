import { Module } from '@nestjs/common';
import { BillingServiceService } from './billing-service.service';
import { BillingServiceController } from './billing-service.controller';

@Module({
  controllers: [BillingServiceController],
  providers: [BillingServiceService],
})
export class BillingServiceModule {}
