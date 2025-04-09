import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingModule } from './sing/sing.module';
import { LoginModule } from './login/login.module';
import { tokenModule } from './token/token.module';
import { PlayersModule } from './players/players.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SingModule, LoginModule, tokenModule, PlayersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
