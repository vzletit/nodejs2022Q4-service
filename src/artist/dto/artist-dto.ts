import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class ArtistDto {
  @IsOptional()
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
