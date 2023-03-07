import { IsString } from 'class-validator';

export class TokensDto {
  @IsString()
  accessToken: string;
  refreshToken: string;
}
