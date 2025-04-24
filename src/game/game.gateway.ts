import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';

import { Socket } from 'socket.io';
import { MovementDto } from './dto/create-game.dto';

@WebSocketGateway({ cors: true })
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('movement-piece')
  async movement(
    @ConnectedSocket() client: Socket,
    @MessageBody() moEnemy: MovementDto,
  ) {
    const emit = moEnemy.userTo + 'movement';

    await this.gameService.updateMovement(moEnemy.movements, moEnemy.id);

    client.broadcast.emit(emit, moEnemy);
  }
}
