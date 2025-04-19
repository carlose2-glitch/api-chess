import { IsNumber, IsString } from 'class-validator';

export class MovementDto {
  @IsString()
  userTo: string;
  @IsString()
  piece: string;
  @IsString()
  col: string;
  @IsString()
  row: string;
  @IsNumber()
  movements: number;
}
