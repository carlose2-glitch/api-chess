import { IsString } from 'class-validator';

export class DeapertureDto {
  @IsString()
  tokenUser: string;
  @IsString()
  tokenDe: string;
}
