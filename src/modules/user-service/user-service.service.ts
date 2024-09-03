import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../common/database/entities/user.entity';
import { KafkaService } from '../../common/kafka/kafka.service';
import { connection } from '../../common/database/database.module';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
@Injectable()
export class UserServiceService {
  usersRepository: Repository<UserEntity>;
  constructor(private readonly kafkaService: KafkaService) {
    this.usersRepository = connection.getRepository(UserEntity);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    this.kafkaService.emit('user.created', savedUser);
    return savedUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    this.kafkaService.emit('user.updated', updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
    this.kafkaService.emit('user.deleted', { id });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
}
