import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GameService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('update-movement');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }
  async updateMovement(movements: number, id: number, array: any, time: any) {
    if (movements % 2 === 0) {
      try {
        await this.board.update({
          where: {
            id: id,
          },
          data: {
            movements: movements,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            pieces: array,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            timeBlack: time,
          },
        });

        return 'ok';
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return error.message;
      }
    } else {
      try {
        await this.board.update({
          where: {
            id: id,
          },
          data: {
            movements: movements,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            pieces: array,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            timeWhite: time,
          },
        });

        return 'ok';
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return error.message;
      }
    }
  }
}
