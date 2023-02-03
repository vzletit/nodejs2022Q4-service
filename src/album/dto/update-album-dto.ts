import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string;
}

// interface Album {
//   id: string; // uuid v4
//   name: string;
//   year: number;
//   artistId: string | null; // refers to Artist
// }
