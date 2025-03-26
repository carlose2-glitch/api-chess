import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateSingDto } from './dto/create-sing.dto';
import { UpdateSingDto } from './dto/update-sing.dto';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class SingService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Chess-service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async create(createSingDto: CreateSingDto) {
    const user = await this.users.create({
      data: createSingDto,
    });
    return user;
  }

  findAll() {
    return `This action returns all sing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sing`;
  }

  update(id: number, updateSingDto: UpdateSingDto) {
    return `This action updates a #${id} sing`;
  }

  remove(id: number) {
    return `This action removes a #${id} sing`;
  }
}
