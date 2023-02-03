import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { DbService } from 'src/utils/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUsers() {
    const users = this.dbService.getMany('users');
    return users.map((user) => ({ id: user.id, login: user.login }));
  }

  getUser(userId: string) {
    return this.dbService.getOne('users', userId);
  }

  createUser(createUserDto: CreateUserDto) {
    const { id } = this.dbService.addOne('users', createUserDto);
    this.dbService.updateOne('users', id, {
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const createdUser = this.dbService.getOne('users', id);

    const returnUserObj = { ...createdUser };
    delete returnUserObj.password;
    return returnUserObj;
  }

  updatePassword(updatePassword: UpdatePasswordDto, userId: string) {
    const { version } = this.dbService.getOne('users', userId);
    const { newPassword } = updatePassword;
    this.dbService.updateOne('users', userId, {
      updatedAt: Date.now(),
      version: version + 1,
      password: newPassword,
    });
  }

  deleteUser(userId: string) {
    this.dbService.deleteOne('users', userId);
  }
}
