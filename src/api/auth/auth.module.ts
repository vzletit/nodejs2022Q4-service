import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, PrismaService, CustomLogger],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
