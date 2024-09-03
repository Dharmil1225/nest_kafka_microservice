import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
@Controller('user-service')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userServiceService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userServiceService.findOne(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userServiceService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userServiceService.deleteUser(id);
  }
}
