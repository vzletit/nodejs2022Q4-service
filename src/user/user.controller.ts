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
import { UserDto } from './dto/user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import {
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

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
    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }
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
    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Current password is incorrect');
    }

    return this.userService.updatePassword(updatePasswordDto, userId);
  }

  @Delete('/:userId')
  @HttpCode(204)
  deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    this.userService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
