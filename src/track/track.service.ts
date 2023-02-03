import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto } from './dto/update-track-dto';
import { DbService } from '../db/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  getTracks() {
    return this.dbService.getMany('tracks');
  }

  getTrack(trackId: string) {
    return this.dbService.getOne('tracks', trackId);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    return this.dbService.addOne('tracks', createTrackDto);
  }

  updateTrack(updateTrackDto: UpdateTrackDto, trackId: string) {
    return this.dbService.updateOne('tracks', trackId, {
      ...updateTrackDto,
    });
  }

  deleteTrack(trackId: string) {
    this.dbService.deleteOne('tracks', trackId);
  }
}
