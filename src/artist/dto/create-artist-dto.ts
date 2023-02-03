import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}

// interface Artist {
//   id: string; // uuid v4
//   name: string;
//   grammy: boolean;
// }
