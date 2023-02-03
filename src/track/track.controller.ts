import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto } from './dto/update-track-dto';
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
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put('/:trackId')
  updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(`Track ID ${trackId} not found`);
    }
    return this.trackService.updateTrack(updateTrackDto, trackId);
  }

  @Delete('/:trackId')
  deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new NotFoundException(`Track ID ${trackId} not found`);
    }

    this.trackService.deleteTrack(trackId);
    return { message: 'Track deleted successfully' };
  }
}
