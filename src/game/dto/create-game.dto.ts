import { IsNumber, IsString } from 'class-validator';

export interface Pieces {
  name: string;
  left: string;
  src: string;
  class: string;
  top: string;
  movements: number;
}

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
  @IsNumber()
  id: number;
  array: Pieces[];
}
