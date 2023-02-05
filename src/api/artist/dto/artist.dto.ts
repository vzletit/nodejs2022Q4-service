import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class ArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
