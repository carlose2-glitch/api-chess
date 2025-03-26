import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SingService } from './sing.service';
import { CreateSingDto } from './dto/create-sing.dto';
import { UpdateSingDto } from './dto/update-sing.dto';

@Controller('sing')
export class SingController {
  constructor(private readonly singService: SingService) {}

  @Post('/create')
  create(@Body() createSingDto: CreateSingDto) {
    return this.singService.create(createSingDto);
  }

  @Get()
  findAll() {
    return this.singService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.singService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSingDto: UpdateSingDto) {
    return this.singService.update(+id, updateSingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.singService.remove(+id);
  }
}
