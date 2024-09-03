import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBillingDto, UpdateBillingDto } from './dtos/billing.dto';
import { BillingEntity } from '../../common/database/entities/billing.entity';
import { connection } from '../../common/database/database.module';
import { KafkaService } from '../../common/kafka/kafka.service';
@Injectable()
export class BillingServiceService {
  billingRepository: Repository<BillingEntity>;
  constructor(private readonly kafkaService: KafkaService) {
    this.billingRepository = connection.getRepository(BillingEntity);
  }

  async createBilling(createBillingDto: CreateBillingDto) {
    const billing = this.billingRepository.create(createBillingDto);
    const savedBilling = await this.billingRepository.save(billing);
    this.kafkaService.emit('billing.created', savedBilling);
    return savedBilling;
  }

  async updateBilling(id: string, updateBillingDto: UpdateBillingDto) {
    await this.billingRepository.update(id, updateBillingDto);
    const updatedBilling = await this.billingRepository.findOneBy({ id });
    this.kafkaService.emit('billing.updated', updatedBilling);
    return updatedBilling;
  }

  async deleteBilling(id: string) {
    await this.billingRepository.delete(id);
    this.kafkaService.emit('billing.deleted', { id });
  }

  async findAll() {
    return this.billingRepository.find({ relations: ['order'] });
  }

  async findOne(id: string) {
    return this.billingRepository.findOneBy({ id });
  }
}
