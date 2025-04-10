import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

interface Users {
  user: string;
  points: number;
  online: boolean;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all/:name')
  async findAll(@Param('name') name: string) {
    const data = await this.usersService.findAll(name);

    const users: Users[] = [];

    data.forEach((e) => {
      users.push({
        user: e.user,
        points: e.points,
        online: false,
      });
    });
    return users;
  }
}
