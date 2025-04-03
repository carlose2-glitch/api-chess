import { Module } from '@nestjs/common';
import { tokenController } from './token.controller';

@Module({
  controllers: [tokenController],
  providers: [],
})
export class tokenModule {}
