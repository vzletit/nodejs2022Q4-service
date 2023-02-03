import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()

  // GET /user - get all users
  // Server should answer with status code 200 and all users records
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')

  //   GET /user/:id - get single user by id
  //   Server should answer with status code 200 and and record with id === userId if it exists
  //   Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  //   Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

  // ParseIntPipe проверяет userId на Int при вводе в строке запроса
  // getUser(@Param('userId', ParseIntPipe) userId: number) {
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  //   POST /user - create user (following DTO should be used) CreateUserDto
  //   interface CreateUserDto {
  //     login: string;
  //     password: string;
  //   }
  // Server should answer with status code 201 and newly created record if request is valid
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // PUT /user/:id - update user's password UpdatePasswordDto (with attributes):
  // interface UpdatePasswordDto {
  //   oldPassword: string; // previous password
  //   newPassword: string; // new password
  // }

  @Put('/:userId')
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId') userId: string,
  ) {
    return this.userService.updatePassword(updatePasswordDto, userId);
  }

  @Delete('/:userId')
  // DELETE /user/:id - delete user
  // Server should answer with status code 204 if the record is found and deleted
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
