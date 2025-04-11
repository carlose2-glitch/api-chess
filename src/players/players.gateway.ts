import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PlayersService } from './players.service';

import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { invitationDto } from './dto/create-player.dto';

@WebSocketGateway({ cors: true })
export class PlayersGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;
  constructor(private readonly playersService: PlayersService) {}
  /*manejador del cliente conectado */
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      const { user } = socket.handshake.auth;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.playersService.onUsersConnected({ user: user, online: true });
      this.server.emit('clients-online', this.playersService.getUsers());

      socket.on('disconnect', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.playersService.onUsersDiconnect(user);
        this.server.emit('clients-online', this.playersService.getUsers());
      });
    });
  }

  @SubscribeMessage('invitation')
  conexion(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: invitationDto,
  ) {
    client.broadcast.emit(data.userTo, data);
  }
}
