import { Controller } from '@nestjs/common';
import { BillingServiceService } from './billing-service.service';

@Controller('billing-service')
export class BillingServiceController {
  constructor(private readonly billingServiceService: BillingServiceService) {}
}
