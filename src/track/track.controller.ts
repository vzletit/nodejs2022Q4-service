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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track-dto';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';

@Controller('/track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get('/:trackId')
  getUser(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(`Track ID ${trackId} not found`);
    }
    return track;
  }

  @Post()
  createTrack(@Body() createTrackDto: TrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put('/:trackId')
  updateTrack(
    @Body() updateTrackDto: TrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(`Track ID ${trackId} not found`);
    }
    return this.trackService.updateTrack(updateTrackDto, trackId);
  }

  @Delete('/:trackId')
  @HttpCode(204)
  deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(`Track ID ${trackId} not found`);
    }

    this.trackService.deleteTrack(trackId);
    return { message: 'Track deleted successfully' };
  }
}
