import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingModule } from './sing/sing.module';
import { LoginModule } from './login/login.module';
import { tokenModule } from './token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [],
      synchronize: true,
    }),
    SingModule,
    LoginModule,
    tokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
