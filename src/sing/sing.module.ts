import { Module } from '@nestjs/common';
import { SingService } from './sing.service';
import { SingController } from './sing.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SingController],
  providers: [SingService],
})
export class SingModule {}
