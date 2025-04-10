import { Injectable } from '@nestjs/common';

interface Users {
  user: string;
  online: boolean;
}

@Injectable()
export class PlayersService {
  private users: Record<string, Users> = {};

  onUsersConnected(user: Users) {
    this.users[user.user] = user;
    console.log(this.users);
  }
  onUsersDiconnect(user: string) {
    delete this.users[user];
  }
  getUsers() {
    return Object.values(this.users);
  }
}
