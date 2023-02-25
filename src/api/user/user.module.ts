import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';

@Module({
  providers: [UserService, PrismaService, CustomLogger],
  controllers: [UserController],
})
export class UserModule {}
