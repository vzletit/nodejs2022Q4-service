import { handleNotFound } from 'src/utils/errorHandlers';
import { HidePasswordInterceptor } from 'src/Interceptors/hidePassword.interceptor';
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
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
@UseInterceptors(HidePasswordInterceptor)
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getUsers() {
    const users = await this.prisma.users.findMany();
    return users.map((user) => {
      if (user) {
        delete user.password;
      }
      return user;
    });
  }

  @Get('/:userId')
  async getUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    handleNotFound(user);
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return await this.prisma.users.create({ data: createUserDto });
  }

  @Put('/:userId')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    handleNotFound(user);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }

    return await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        version: user.version + 1,
        password: updatePasswordDto.newPassword,
      },
    });
  }

  @Delete('/:userId')
  @HttpCode(204)
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    handleNotFound(user);

    await this.prisma.users.delete({ where: { id: userId } });
    return { message: 'User deleted successfully' };
  }
}
