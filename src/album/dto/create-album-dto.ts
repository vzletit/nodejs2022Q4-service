import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
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
