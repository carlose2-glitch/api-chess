import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeapertureDto } from './dto/deaperture.dto';

@Controller('token')
export class tokenController {
  constructor(private jwtAuthService: JwtService) {}
  @Get(':token')
  async getToken(@Param('token') t: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await this.jwtAuthService.verifyAsync(t);

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data: data.name,
        to: '#',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        r: data,
      };
    } catch (error) {
      return {
        data: 'iniciar sesion',
        to: '/auth/login',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        r: error,
      };
    }
  }
  @Post('/deaperture')
  async deaperture(@Body() de: DeapertureDto) {
    console.log(de);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const dataUser = await this.jwtAuthService.verifyAsync(de.tokenUser);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const dataDe = await this.jwtAuthService.verifyAsync(de.tokenDe);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (dataUser.name === dataDe.userFrom) {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          name: dataUser.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          enemy: dataDe.userTo,
          color: 'black',
          juego: 1,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (dataUser.name === dataDe.userTo) {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          name: dataUser.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          enemy: dataDe.userFrom,
          color: 'white',
          juego: 0,
        };
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }
}
