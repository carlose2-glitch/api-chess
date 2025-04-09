import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('extract all users');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async findAll(name: string) {
    const users = await this.users.findMany({
      where: {
        NOT: {
          user: name,
        },
      },
      select: {
        user: true,
        points: true,
      },
    });

    return users;
  }
}
