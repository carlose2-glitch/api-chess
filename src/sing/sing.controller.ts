import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { SingService } from './sing.service';
import { CreateSingDto } from './dto/create-sing.dto';
import { Response } from 'express';

@Controller('sing')
export class SingController {
  constructor(private readonly singService: SingService) {}

  @Post('/create')
  create(@Body() createSingDto: CreateSingDto) {
    return this.singService.create(createSingDto);
  }

  @Get('/create')
  get(@Res({ passthrough: true }) response: Response) {
    response.cookie('pabl', 'perez');
    return 'hola';
  }
}
