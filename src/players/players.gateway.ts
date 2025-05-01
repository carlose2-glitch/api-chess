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
import { invitationDto } from './dto/invitationPlayer.dto';

import { canceledDto } from './dto/canceledPlayer.dto';
import { Accept } from './dto/acceptInvitation.dto';
import { TokenMatch } from './dto/dataToken.dto';

interface Time {
  min: number;
  seg: number;
}

@WebSocketGateway({ cors: true })
export class PlayersGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;
  constructor(private readonly playersService: PlayersService) {}
  /*manejador del cliente conectado */
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      const { user } = socket.handshake.auth;

      this.playersService.onUsersConnected({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: user,
        online: true,
      });
      this.server.emit('clients-online', this.playersService.getUsers());

      socket.on('disconnect', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.playersService.onUsersDiconnect(user);
        this.server.emit('clients-online', this.playersService.getUsers());
      });
    });
  }
  /*invitacion del jugador */
  @SubscribeMessage('invitation')
  conexion(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: invitationDto,
  ) {
    client.broadcast.emit(data.userTo, data);
  }
  /*aceptar invitacion invitado*/
  @SubscribeMessage('accept-invitation')
  async acceptInvitation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Accept,
  ) {
    const emit = data.userTo + 'accepted';

    const time: Time | null =
      data.time === 'null'
        ? { min: 0, seg: 0 }
        : { min: Number(data.time), seg: 0 };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id = await this.playersService.createTable(data, time);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    client.broadcast.emit(emit, id.id);
  }
  /*redireccionamiento del que invita */
  @SubscribeMessage('redirect-accept')
  acceptRedirect(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TokenMatch,
  ) {
    const emit = data.userTo + 'token';

    client.broadcast.emit(emit, data.id);
  }

  /* cancelar invitacion de parte del invitado*/
  @SubscribeMessage('canceled-invited')
  canceledInvited(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: canceledDto,
  ) {
    const emit = data.userTo + 'canceled';
    client.broadcast.emit(emit, data.closeModal);
  }
  /*cancelar invitacion del que invita */
  @SubscribeMessage('canceled-invite')
  canceledInvite(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: canceledDto,
  ) {
    const emit = data.userTo + 'invite';

    client.broadcast.emit(emit, data.closeModal);
  }
}
