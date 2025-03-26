import { PartialType } from '@nestjs/mapped-types';
import { CreateSingDto } from './create-sing.dto';

export class UpdateSingDto extends PartialType(CreateSingDto) {}
