import { Module } from '@nestjs/common';
import { SingService } from './sing.service';
import { SingController } from './sing.controller';
import { create } from './createUser';

@Module({
  controllers: [SingController],
  providers: [SingService, create],
})
export class SingModule {}
