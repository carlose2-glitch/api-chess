import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  create(createPlayerDto: any) {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
