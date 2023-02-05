import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId?: string;
}
