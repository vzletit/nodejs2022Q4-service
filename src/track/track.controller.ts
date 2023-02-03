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

@Controller('/track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()

  // GET /track - get all tracks
  // Server should answer with status code 200 and all tracks records
  getTracks() {
    return this.trackService.getTracks();
  }

  // GET /track/:id - get single track by id
  // Server should answer with status code 200 and and record with id === trackId if it exists
  // Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist

  @Get('/:trackId')
  getTrack(@Param('trackId') trackId: string) {
    return this.trackService.getTrack(trackId);
  }

  // POST /track - create new track
  // Server should answer with status code 201 and newly created record if request is valid
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  // PUT /track/:id - update track info
  // Server should answer with status code 200 and updated record if request is valid
  // Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist

  @Put('/:trackId')
  updateTrack(
    @Body() updatePasswordDto: UpdateTrackDto,
    @Param('trackId') trackId: string,
  ) {
    return this.trackService.updateTrack(updatePasswordDto, trackId);
  }

  // DELETE /track/:id - delete track
  // Server should answer with status code 204 if the record is found and deleted
  // Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist

  @Delete('/:trackId')
  deleteTrack(@Param('trackId') trackId: string) {
    return this.trackService.deleteTrack(trackId);
  }
}
