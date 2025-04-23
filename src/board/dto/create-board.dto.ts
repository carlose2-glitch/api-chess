import { IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  id: string;
  @IsString()
  token: string;
}
