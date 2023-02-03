import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { DbService } from 'src/db/db.service';

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
    const createdUser = this.dbService.addOne('users', createUserDto);
    const returnUserObj = { ...createdUser };
    delete returnUserObj.password;
    return returnUserObj;
  }

  updatePassword(updatePassword: UpdatePasswordDto, userId: string) {
    const { newPassword } = updatePassword;
    this.dbService.updateOne('users', userId, {
      password: newPassword,
    });
  }

  deleteUser(userId: string) {
    this.dbService.deleteOne('users', userId);
  }
}
