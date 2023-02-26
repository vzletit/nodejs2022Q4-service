import { Injectable, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private jwtService: JwtService,
  ) {}

  async isPasswordCorrect(
    user: UserDto,
    givenPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, user.password);
  }

  async signUp(createUserDto: UserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT),
    );
    const newUserDto = { ...createUserDto, password: hashedPassword };
    const user = await this.user.createUser(newUserDto);
    delete user.password;
    return { token: this.jwtService.sign(user) };
  }

  async login(createUserDto: UserDto) {}
}
