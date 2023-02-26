import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TrackService, PrismaService],
  controllers: [TrackController],
})
export class TrackModule {}
