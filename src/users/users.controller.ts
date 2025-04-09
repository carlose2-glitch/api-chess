import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all/:name')
  findAll(@Param('name') name: string) {
    return this.usersService.findAll(name);
  }
}
