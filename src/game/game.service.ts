import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GameService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('update-movement');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }
  async updateMovement(movements: number, id: number) {
    try {
      await this.board.update({
        where: {
          id: id,
        },
        data: {
          movements: movements,
        },
      });

      return 'ok';
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return error.message;
    }
  }
}
