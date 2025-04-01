import { IsNumber, IsString, Min } from 'class-validator';

export class CreateSingDto {
  @IsString()
  user: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(0)
  points: number;
}
