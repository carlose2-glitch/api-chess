import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSingDto {
  @IsString()
  user: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsPositive()
  points: number;
}
