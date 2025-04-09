import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersGateway } from './players.gateway';

@Module({
  providers: [PlayersGateway, PlayersService],
})
export class PlayersModule {}
