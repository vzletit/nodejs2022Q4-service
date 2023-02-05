import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound, handleWrongPassword } from 'src/utils/errorHandlers';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.userService.getUser(userId);
    handleNotFound(user);
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:userId')
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const user = this.userService.getUser(userId);

    handleNotFound(user);
    handleWrongPassword(user.password, updatePasswordDto.oldPassword);

    return this.userService.updatePassword(updatePasswordDto, userId);
  }

  @Delete('/:userId')
  @HttpCode(204)
  deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.userService.getUser(userId);
    handleNotFound(user);
    this.userService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
