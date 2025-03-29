import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateSingDto } from './dto/create-sing.dto';

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SingService extends PrismaClient implements OnModuleInit {
  constructor(private jwtAuthService: JwtService) {
    super();
  }
  private readonly logger = new Logger('Chess-service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async create(createSingDto: CreateSingDto) {
    /*verificar si el usuario existe */

    try {
      const findUser = await this.users.findFirst({
        where: {
          OR: [{ user: createSingDto.user }, { email: createSingDto.email }],
        },
      });

      if (!findUser) {
        //encriptar clave
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const passwordBycrypt: string = await hash(createSingDto.password, 10);

        /*guardar en la base de datos*/
        const data = await this.users.create({
          data: {
            user: createSingDto.user,
            email: createSingDto.email,
            password: passwordBycrypt,
            points: createSingDto.points,
          },
        });
        /*generar el jwt */

        const payload = {
          id: data.id,
          name: data.user,
        };

        const token = await this.jwtAuthService.signAsync(payload);

        return {
          r: 'usuario creado',
        };
      } else {
        throw new Error('El usuario o correo ya existe');
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return error.message;
    }
  }
}
