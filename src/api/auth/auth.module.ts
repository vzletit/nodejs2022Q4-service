import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [AuthService, PrismaService, CustomLogger],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
