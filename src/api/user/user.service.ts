import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DbService } from 'src/utils/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async getUsers() {
    const users = await this.dbService.getMany('users');
    return users.map((user) => ({ id: user.id, login: user.login }));
  }

  async getUser(userId: string) {
    return await this.dbService.getOne('users', userId);
  }

  async createUser(createUserDto: UserDto) {
    const newUserObj = {
      ...createUserDto,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await this.dbService.addOne('users', newUserObj);

    const returnUserObj = { ...newUserObj };
    delete returnUserObj.password;
    return returnUserObj;
  }

  async updatePassword(updatePassword: UpdatePasswordDto, userId: string) {
    const { version } = await this.dbService.getOne('users', userId);
    const { newPassword } = updatePassword;
    this.dbService.updateOne('users', userId, {
      updatedAt: Date.now(),
      version: version + 1,
      password: newPassword,
    });

    const updatedUser = await this.dbService.getOne('users', userId);

    const returnUserObj = { ...updatedUser };
    delete returnUserObj.password;
    return returnUserObj;
  }

  async deleteUser(userId: string) {
    await this.dbService.deleteOne('users', userId);
  }
}
