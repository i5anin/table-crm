// create-lead.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  // ... другие поля для создания сделки
}
