import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersGateway } from './players.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PlayersGateway, PlayersService],
})
export class PlayersModule {}
