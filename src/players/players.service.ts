import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Accept } from './dto/acceptInvitation.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';

interface Users {
  user: string;
  online: boolean;
  g: boolean;
  b: number;
}
interface Time {
  min: number;
  seg: number;
}

/*interface Pieces {
  name: string;
  left: string;
  src: string;
  class: string;
  top: string;
  movements: number;
}*/

/*interface Table {
  movements: number;
  modality: string;
  blackWiner: boolean | null;
  whiteWiner: boolean | null;
  userBlack: boolean | null;
  userWhite: string | null;
  game: 'in-progress' | 'finished';
  pieces: Pieces[];
}*/

@Injectable()
export class PlayersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('create-table-service');

  constructor(private jwtAuthService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }
  private userss: Record<string, Users> = {};

  onUsersConnected(user: Users) {
    this.userss[user.user] = user;
  }
  onUsersDiconnect(user: string) {
    delete this.userss[user];
  }

  getUsers() {
    return Object.values(this.userss);
  }

  async generateToken(data: Accept) {
    const payload = {
      userFrom: data.userFrom,
      userTo: data.userTo,
      time: data.time,
    };
    const token = await this.jwtAuthService.signAsync(payload);

    return token;
  }

  async createTable(data: Accept, time: Time | null) {
    const timeBoth =
      time === null
        ? Prisma.JsonNull
        : ({ min: time.min, seg: time.seg } as Prisma.JsonObject);

    const array = [
      /*piezas negras */
      {
        name: 'black-rook1',
        left: '0/8',
        src: 'torre-negra.png',
        class:
          'absolute duration-700 left-0/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-knight1',
        left: '1/8',
        src: 'caballo-negro.png',
        class:
          'absolute duration-700 left-1/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-bishop1',
        left: '2/8',
        src: 'alfil-negro.png',
        class:
          'absolute duration-700 left-2/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-queen',
        left: '3/8',
        src: 'Dama-negra.png',
        class:
          'absolute duration-700 left-3/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-king',
        left: '4/8',
        src: 'rey-negro.png',
        class:
          'absolute duration-700 left-4/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-bishop2',
        left: '5/8',
        src: 'alfil-negro.png',
        class:
          'absolute duration-700 left-5/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-knight2',
        left: '6/8',
        src: 'caballo-negro.png',
        class:
          'absolute duration-700 left-6/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-rook2',
        left: '7/8',
        src: 'torre-negra.png',
        class:
          'absolute duration-700 left-7/8 top-0/8 w-1/8 cursor-pointer rotate-360',
        top: '0/8',
        movements: 0,
      },
      {
        name: 'black-pawn1',
        left: '0/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-0/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn2',
        left: '1/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-1/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn3',
        left: '2/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-2/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn4',
        left: '3/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-3/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn5',
        left: '4/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-4/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn6',
        left: '5/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-5/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn7',
        left: '6/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-6/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },
      {
        name: 'black-pawn8',
        left: '7/8',
        src: 'peon-negro.png',
        class:
          'absolute duration-700 left-7/8 top-1/8 w-1/8 cursor-pointer rotate-360',
        top: '1/8',
        movements: 0,
      },

      /*white pieces  */

      {
        name: 'white-rook1',
        left: '0/8',
        src: 'torre-blanca.png',
        class:
          'absolute duration-700 left-0/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-knight1',
        left: '1/8',
        src: 'caballo-blanco.png',
        class:
          'absolute duration-700 left-1/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-bishop1',
        left: '2/8',
        src: 'alfil-blanco.png',
        class:
          'absolute duration-700 left-2/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-queen',
        left: '3/8',
        src: 'dama-blanca.png',
        class:
          'absolute duration-700 left-3/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-king',
        left: '4/8',
        src: 'rey-blanco.png',
        class:
          'absolute duration-700 left-4/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-bishop2',
        left: '5/8',
        src: 'alfil-blanco.png',
        class:
          'absolute duration-700 left-5/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-knight2',
        left: '6/8',
        src: 'caballo-blanco.png',
        class:
          'absolute duration-700 left-6/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-rook2',
        left: '7/8',
        src: 'torre-blanca.png',
        class:
          'absolute duration-700 left-7/8 top-7/8 w-1/8 cursor-pointer rotate-360',
        top: '7/8',
        movements: 0,
      },
      {
        name: 'white-pawn1',
        left: '0/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-0/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn2',
        left: '1/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-1/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn3',
        left: '2/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-2/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn4',
        left: '3/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-3/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn5',
        left: '4/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-4/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn6',
        left: '5/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-5/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn7',
        left: '6/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-6/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
      {
        name: 'white-pawn8',
        left: '7/8',
        src: 'peon-blanco.png',
        class:
          'absolute duration-700 left-7/8 top-6/8 w-1/8 cursor-pointer rotate-360',
        top: '6/8',
        movements: 0,
      },
    ] as Prisma.JsonArray;

    try {
      const id = await this.board.create({
        data: {
          movements: 0,
          modality: 'online',
          blackWiner: null,
          whiteWiner: null,
          userBlack: data.userFrom,
          userWhite: data.userTo,
          game: 'in-progress',
          time: data.time,
          timeWhite: timeBoth,
          timeBlack: timeBoth,
          pieces: array,
        },
      });

      return {
        id: id.id.toString(),
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return error.message;
    }
  }
}
