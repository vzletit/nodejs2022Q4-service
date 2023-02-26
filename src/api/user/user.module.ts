import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/custom-logger/custom-logger.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, PrismaService, CustomLogger],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
