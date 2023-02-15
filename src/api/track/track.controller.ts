import { PrismaService } from 'src/prisma/prisma.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

@Controller('/track')
export class TrackController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getTracks() {
    return await this.prisma.tracks.findMany();
  }

  @Get('/:trackId')
  async getTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.prisma.tracks.findUnique({
      where: { id: trackId },
    });
    handleNotFound(track);
    return track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.prisma.tracks.create({ data: createTrackDto });
  }

  @Put('/:trackId')
  async updateTrack(
    @Body() updateTrackDto: TrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ) {
    const track = await this.prisma.tracks.findUnique({
      where: { id: trackId },
    });

    handleNotFound(track);

    return await this.prisma.tracks.update({
      where: {
        id: trackId,
      },
      data: {
        ...updateTrackDto,
      },
    });
  }

  @Delete('/:trackId')
  @HttpCode(204)
  async deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.prisma.tracks.findUnique({
      where: { id: trackId },
    });

    handleNotFound(track);
    await this.prisma.tracks.delete({ where: { id: trackId } });
    return { message: 'Track deleted successfully' };
  }
}
