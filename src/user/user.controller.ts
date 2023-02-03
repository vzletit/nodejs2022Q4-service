import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import {
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
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
  createUser(@Body() createUserDto: CreateUserDto) {
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
      console.log(user.password);
      console.log(updatePasswordDto.oldPassword);
      throw new BadRequestException('Current password is incorrect');
    }

    this.userService.updatePassword(updatePasswordDto, userId);
    return { message: 'Password updated successfully' };
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    this.userService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
