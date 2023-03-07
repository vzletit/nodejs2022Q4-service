import { handleNotFound } from 'src/utils/errorHandlers';
import { HidePasswordInterceptor } from 'src/Interceptors/hidePassword.interceptor';
import { ConvertDateTimeInterceptor } from 'src/Interceptors/convertDateTime.interceptor';
import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
@UseInterceptors(HidePasswordInterceptor)
@UseInterceptors(ConvertDateTimeInterceptor)
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.user.getUsers();
    return users.map((user) => {
      if (user) {
        delete user.password;
      }
      return user;
    });
  }

  @Get('/:userId')
  async getUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.user.getUser(userId);

    await handleNotFound(user);
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    try {
      return await this.user.createUser(createUserDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Put('/:userId')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const user = await this.user.getUser(userId);

    await handleNotFound(user);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }

    return await this.user.updateUser(
      {
        version: user.version + 1,
        password: updatePasswordDto.newPassword,
      },
      userId,
    );
  }

  @Delete('/:userId')
  @HttpCode(204)
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.user.getUser(userId);

    await handleNotFound(user);

    await this.user.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
