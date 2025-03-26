import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LoginService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Chess-service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }
  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
