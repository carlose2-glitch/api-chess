// import { InjectModel } from '@nestjs/mongoose';
// import { sign } from 'crypto';
// import { Model } from 'mongoose';
// import { createDocument } from './schemas/createUserSchema';
import { CreateSingDto } from './dto/create-sing.dto';

export class create {
  //   constructor(
  //     @InjectModel(sign.name) private createDocument: Model<createDocument>,
  //   ) {}

  createUser(data: CreateSingDto) {
    return data;
  }
}
