import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseInterceptors, Post, Body, HttpCode } from '@nestjs/common';
import { Public } from './public.decorator';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { HidePasswordInterceptor } from 'src/Interceptors/hidePassword.interceptor';
import { TokensDto } from './dto/tokens.dto';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';

@Public()
@Controller('auth')
@UseInterceptors(HidePasswordInterceptor)
export class AuthController {
  constructor(private authService: AuthService, private user: UserService) {}

  @Post('/signup')
  async signup(@Body() userDto: UserDto) {
    // const user = await this.user.getUserByLogin(userDto.login);
    // if (user) {
    //   throw new BadRequestException('User already exists');
    // }
    return await this.authService.signUp(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: UserDto) {
    if (
      !(await this.authService.validateUser(userDto.login, userDto.password))
    ) {
      throw new ForbiddenException('Authentication failed');
    }
    return await this.authService.login(userDto);
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() refreshTokenObj) {
    return await this.authService.refreshTokens(refreshTokenObj);
  }
}
