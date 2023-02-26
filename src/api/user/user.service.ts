import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async getUser(userId: string) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserByLogin(login: string) {
    return await this.prisma.user.findFirst({ where: { login } });
  }

  async createUser(createUserDto: UserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(updateObj, userId: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateObj,
    });
  }

  async deleteUser(userId: string) {
    return await this.prisma.user.delete({ where: { id: userId } });
  }
}
