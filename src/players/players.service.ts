import { Injectable } from '@nestjs/common';
import { Accept } from './dto/acceptInvitation.dto';
import { JwtService } from '@nestjs/jwt';

interface Users {
  user: string;
  online: boolean;
}

@Injectable()
export class PlayersService {
  constructor(private jwtAuthService: JwtService) {}
  private users: Record<string, Users> = {};

  onUsersConnected(user: Users) {
    this.users[user.user] = user;
  }
  onUsersDiconnect(user: string) {
    delete this.users[user];
  }

  getUsers() {
    return Object.values(this.users);
  }

  async generateToken(data: Accept) {
    const payload = {
      userFrom: data.userFrom,
      userTo: data.userTo,
      time: data.time,
    };
    const token = await this.jwtAuthService.signAsync(payload);

    return token;
  }
}
