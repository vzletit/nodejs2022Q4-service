import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUsers() {
    return this.dbService.getMany('users');
  }

  getUser(userId: string) {
    return this.dbService.getOne('users', userId);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.dbService.addOne('users', createUserDto);
  }

  updatePassword(updatePassword: UpdatePasswordDto, userId: string) {
    const { oldPassword, newPassword } = updatePassword;
    const user = this.dbService.getOne('users', userId);
    if (!user) {
      return Error('User not found');
    }
    if (user.password !== oldPassword) {
      return Error('Old password does not match');
    }
    return this.dbService.updateOne('users', userId, { password: newPassword });
  }

  deleteUser(userId: string) {
    return { userId, message: 'user deleted' };
  }
}
