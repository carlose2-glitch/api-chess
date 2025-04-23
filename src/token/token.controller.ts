import { Controller, Get, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
}
