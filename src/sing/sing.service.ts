import { Injectable } from '@nestjs/common';
import { CreateSingDto } from './dto/create-sing.dto';
import { UpdateSingDto } from './dto/update-sing.dto';
import { create } from './createUser';

@Injectable()
export class SingService {
  constructor(private createUser: create) {}
  create(createSingDto: CreateSingDto) {
    return this.createUser.createUser(createSingDto);
  }

  findAll() {
    return `This action returns all sing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sing`;
  }

  update(id: number, updateSingDto: UpdateSingDto) {
    return `This action updates a #${id} sing`;
  }

  remove(id: number) {
    return `This action removes a #${id} sing`;
  }
}
