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
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  async getUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.userService.getUser(userId);
    await handleNotFound(user);
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put('/:userId')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const user = await this.userService.getUser(userId);

    await handleNotFound(user);
    await handleWrongPassword(user.password, updatePasswordDto.oldPassword);

    return await this.userService.updatePassword(updatePasswordDto, userId);
  }

  @Delete('/:userId')
  @HttpCode(204)
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.userService.getUser(userId);
    await handleNotFound(user);
    await this.userService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
