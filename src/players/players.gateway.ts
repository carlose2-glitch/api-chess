import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PlayersGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly playersService: PlayersService) {}

  @WebSocketServer()
  public server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Cliente conectado ', client.handshake.auth.user);
    client.broadcast.emit('on-connect', 'conectado');
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Cliente desconectado', client.handshake.auth.user);
    client.broadcast.emit('off-disconnect', 'conectado');
  }

  /* @SubscribeMessage('conexion')
  conexion(
    @ConnectedSocket() client: Socket,
    @MessageBody() createPlayerDto: any,
  ) {
    client.broadcast.emit('');
  }*/

  @SubscribeMessage('findAllPlayers')
  findAll() {
    return this.playersService.findAll();
  }

  @SubscribeMessage('findOnePlayer')
  findOne(@MessageBody() id: number) {
    return this.playersService.findOne(id);
  }

  @SubscribeMessage('removePlayer')
  remove(@MessageBody() id: number) {
    return this.playersService.remove(id);
  }
}
