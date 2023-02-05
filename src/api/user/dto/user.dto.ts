import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  // @IsOptional()
  // @IsNumber()
  // version: number; // integer number, increments on update

  // @IsOptional()
  // @IsNumber()
  // createdAt: number; // timestamp of creation

  // @IsOptional()
  // @IsNumber()
  // updatedAt: number; // timestamp of last update
}