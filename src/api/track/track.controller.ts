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
import { TrackDto } from './dto/track.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

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
    handleNotFound(track);
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
    handleNotFound(track);
    return this.trackService.updateTrack(updateTrackDto, trackId);
  }

  @Delete('/:trackId')
  @HttpCode(204)
  deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    handleNotFound(track);
    this.trackService.deleteTrack(trackId);
    return { message: 'Track deleted successfully' };
  }
}
