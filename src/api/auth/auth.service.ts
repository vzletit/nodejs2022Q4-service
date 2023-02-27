import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private user: UserService, private jwtService: JwtService) {}

  private generateAccessToken(user) {
    return this.jwtService.sign(
      {
        userId: user.id,
        login: user.login,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '15m',
      },
    );
  }

  private generateRefreshToken(user) {
    return this.jwtService.sign(
      {
        userId: user.id,
        login: user.login,
      },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '15d',
      },
    );
  }

  private async isPasswordCorrect(
    givenPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, userPassword);
  }

  async signUp(createUserDto: UserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT),
    );
    const newUserDto = { ...createUserDto, password: hashedPassword };
    const user = await this.user.createUser(newUserDto);

    return user;
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.user.getUserByLogin(login);

    if (user && (await this.isPasswordCorrect(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto) {
    const user = await this.user.getUserByLogin(userDto.login);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await this.user.updateUser({ refreshToken }, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens({ refreshToken }) {
    const { userId } = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    const user = await this.user.getUserById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Not authorized to refresh');
    }
    if (user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Not authorized to refresh');
    }

    const newAccesstoken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    await this.user.updateUser({ refreshToken: newRefreshToken }, user.id);

    return {
      accessToken: newAccesstoken,
      refreshToken: newRefreshToken,
    };
  }
}
