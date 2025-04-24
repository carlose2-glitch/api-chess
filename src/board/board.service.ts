import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { BoardDto } from './dto/create-board.dto';
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

  findAll() {
    return `This action returns all board`;
  }

  findBoard(id: string) {
    return `This action returns a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
