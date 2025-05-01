import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';

import { Socket } from 'socket.io';
import { MovementDto, winerDto } from './dto/create-game.dto';

interface Time {
  min: number;
  seg: number;
}
@WebSocketGateway({ cors: true })
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('movement-piece')
  async movement(
    @ConnectedSocket() client: Socket,
    @MessageBody() moEnemy: MovementDto,
  ) {
    const emit = moEnemy.userTo + 'movement';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const time: Time = JSON.parse(moEnemy.time);

    await this.gameService.updateMovement(
      moEnemy.movements,
      moEnemy.id,
      moEnemy.array,
      time,
    );

    client.broadcast.emit(emit, moEnemy);
  }

  @SubscribeMessage('winner')
  winer(@ConnectedSocket() client: Socket, @MessageBody() w: winerDto) {
    const emit = w.user + 'winner';

    client.broadcast.emit(emit, w);
  }
}
