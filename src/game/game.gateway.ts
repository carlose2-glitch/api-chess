import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';

import { Socket } from 'socket.io';
import { MovementDto } from './dto/create-game.dto';

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('movement-piece')
  movement(
    @ConnectedSocket() client: Socket,
    @MessageBody() moEnemy: MovementDto,
  ) {
    const emit = moEnemy.userTo + 'movement';

    console.log(moEnemy);

    client.broadcast.emit(emit, moEnemy);
  }
}
