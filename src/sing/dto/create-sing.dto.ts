import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSingDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  user: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsPositive()
  points: number;
}
