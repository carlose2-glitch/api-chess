import { IsNumber, IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  id: string;
  @IsString()
  token: string;
}

export class updateDto {
  @IsString()
  name: string;
  @IsNumber()
  id: number;
  @IsString()
  color: string;
}
