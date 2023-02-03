import { IsString, IsNumber } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsString()
  artistId: string;
}

// interface Album {
//   id: string; // uuid v4
//   name: string;
//   year: number;
//   artistId: string | null; // refers to Artist
// }
