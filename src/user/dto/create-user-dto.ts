import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

// interface User {
//     id: string; // uuid v4
//     login: string;
//     password: string;
//     version: number; // integer number, increments on update
//     createdAt: number; // timestamp of creation
//     updatedAt: number; // timestamp of last update
//   }
