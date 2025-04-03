import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService extends PrismaClient implements OnModuleInit {
  constructor(private jwtAuthService: JwtService) {
    super();
  }

  private readonly logger = new Logger('Chess-service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async loginUser(logindto: LoginDto) {
    /*buscar usuario */
    const dataUser = await this.users.findFirst({
      where: {
        email: logindto.email,
      },
    });
    /*si el usuario no existe */
    if (!dataUser) {
      return {
        data: 'Usuario invalido',
        r: '',
      };
    }

    const verifyPassword = await compare(logindto.password, dataUser.password);

    if (verifyPassword) {
      /*crear data que se va a guardar el token */
      const payload = {
        id: dataUser.id,
        name: dataUser.user,
      };
      /*crear token */
      const token = await this.jwtAuthService.signAsync(payload);
      return {
        data: 'Ok',
        r: token,
      };
    } else {
      return {
        data: 'Clave invalida',
        r: '',
      };
    }
  }
}
