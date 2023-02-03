import { IsString, IsNumber } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  artistId: string | null; // refers to Artist
  @IsString()
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
}

// interface Track {
//   id: string; // uuid v4
//   name: string;
//   artistId: string | null; // refers to Artist
//   albumId: string | null; // refers to Album
//   duration: number; // integer number
// }
