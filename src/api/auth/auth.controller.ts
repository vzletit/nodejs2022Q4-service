import { BadRequestException, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
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
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { HidePasswordInterceptor } from 'src/Interceptors/hidePassword.interceptor';

@Controller('auth')
@UseInterceptors(HidePasswordInterceptor)
export class AuthController {
  constructor(private auth: AuthService, private user: UserService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: UserDto) {
    const user = await this.user.getUserByLogin(signUpDto.login);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.auth.signUp(signUpDto);
  }

  //   POST auth/login - send login and password to get Access token and Refresh token (optionally)
  

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: UserDto) {
    const user = await this.user.getUserByLogin(loginDto.login);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await this.auth.isPasswordCorrect(user, loginDto.password))) {
      throw new ForbiddenException('Authentication failed');
    }
    return user;
  }
}
