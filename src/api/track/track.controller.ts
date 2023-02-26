import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';
import { AuthGuard } from '../auth/auth.guard';

@Controller('track')
@UseGuards(AuthGuard)
export class TrackController {
  constructor(private track: TrackService) {}

  @Get()
  async getTracks() {
    return await this.track.getTracks();
  }

  @Get('/:trackId')
  async getTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.track.getTrack(trackId);
    await handleNotFound(track);
    return track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.track.createTrack(createTrackDto);
  }
  @Put('/:trackId')
  async updateTrack(
    @Body() updateTrackDto: TrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ) {
    const track = await this.track.getTrack(trackId);

    await handleNotFound(track);

    return await this.track.updateTrack(updateTrackDto, trackId);
  }

  @Delete('/:trackId')
  @HttpCode(204)
  async deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.track.getTrack(trackId);

    await handleNotFound(track);
    await this.track.deleteTrack(trackId);
    return { message: 'Track deleted successfully' };
  }
}
