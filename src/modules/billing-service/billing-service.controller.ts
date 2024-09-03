import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillingServiceService } from './billing-service.service';
import { CreateBillingDto, UpdateBillingDto } from './dtos/billing.dto';

@Controller('billing-service')
export class BillingServiceController {
  constructor(private readonly billingServiceService: BillingServiceService) {}

  @Post()
  async createBilling(@Body() createBillingDto: CreateBillingDto) {
    return this.billingServiceService.createBilling(createBillingDto);
  }

  @Get()
  async findAll() {
    return this.billingServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.billingServiceService.findOne(id);
  }

  @Put(':id')
  async updateBilling(
    @Param('id') id: string,
    @Body() updateBillingDto: UpdateBillingDto,
  ) {
    return this.billingServiceService.updateBilling(id, updateBillingDto);
  }

  @Delete(':id')
  async deleteBilling(@Param('id') id: string): Promise<void> {
    return this.billingServiceService.deleteBilling(id);
  }
}
