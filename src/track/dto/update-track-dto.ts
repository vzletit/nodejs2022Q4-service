import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album
  @IsOptional()
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
