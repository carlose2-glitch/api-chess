import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingModule } from './sing/sing.module';
import { LoginModule } from './login/login.module';
import { tokenModule } from './token/token.module';

@Module({
  imports: [SingModule, LoginModule, tokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
