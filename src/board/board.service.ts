import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { BoardDto, updateDto } from './dto/create-board.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BoardService extends PrismaClient implements OnModuleInit {
  constructor(private jwtAuthService: JwtService) {
    super();
  }

  private readonly logger = new Logger('Board-service');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async boardGame(boardDto: BoardDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tokenUser = await this.jwtAuthService.verifyAsync(boardDto.token);

      const data = await this.board.findFirst({
        where: {
          OR: [
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              userBlack: tokenUser.name,
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            { userWhite: tokenUser.name },
          ],
          AND: [
            {
              id: parseInt(boardDto.id),
            },
            {
              blackWiner: null,
            },
            {
              whiteWiner: null,
            },
          ],
        },
      });

      if (!data) {
        throw new Error('');
      }

      return {
        status: 200,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        name: tokenUser.name,
        board: data,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  async playerWiner(data: updateDto) {
    try {
      const d = await this.users.findFirst({
        where: {
          user: data.name,
        },
      });

      await this.users.update({
        where: {
          id: d?.id,
        },
        data: {
          points: {
            increment: 3,
          },
        },
      });

      if (data.color === 'Blancas') {
        await this.board.update({
          where: {
            id: data.id,
          },
          data: {
            whiteWiner: true,
          },
        });
      } else {
        await this.board.update({
          where: {
            id: data.id,
          },
          data: {
            blackWiner: true,
          },
        });
      }

      return 'ok';
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  findBoard(id: string) {
    return `This action returns a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
