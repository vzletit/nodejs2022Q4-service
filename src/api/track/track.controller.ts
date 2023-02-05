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
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get('/:trackId')
  async getUser(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.trackService.getTrack(trackId);
    await handleNotFound(track);
    return track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put('/:trackId')
  async updateTrack(
    @Body() updateTrackDto: TrackDto,
    @Param('trackId', ParseUUIDPipe) trackId: string,
  ) {
    const track = await this.trackService.getTrack(trackId);
    await handleNotFound(track);
    return this.trackService.updateTrack(updateTrackDto, trackId);
  }

  @Delete('/:trackId')
  @HttpCode(204)
  async deleteTrack(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.trackService.getTrack(trackId);
    await handleNotFound(track);
    await this.trackService.deleteTrack(trackId);
    return { message: 'Track deleted successfully' };
  }
}
