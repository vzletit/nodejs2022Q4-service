import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

// interface Artist {
//   id: string; // uuid v4
//   name: string;
//   grammy: boolean;
// }
