import { IsString, IsNumber, IsOptional } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId?: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  albumId?: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
