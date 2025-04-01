import { Controller, Post, Body } from '@nestjs/common';
import { SingService } from './sing.service';
import { CreateSingDto } from './dto/create-sing.dto';

@Controller('sing')
export class SingController {
  constructor(private readonly singService: SingService) {}
  /*crear usuario y guardarlo en la base de datos */
  @Post('/create')
  create(@Body() createSingDto: CreateSingDto) {
    return this.singService.create(createSingDto);
  }
  /* guardar cookie en el navegador */
}
