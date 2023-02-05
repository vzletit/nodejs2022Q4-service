import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AlbumDto {
  @IsOptional()
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string;
}
