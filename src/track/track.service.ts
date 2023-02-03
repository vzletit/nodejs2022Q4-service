import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto } from './dto/update-track-dto';
import { DbService } from '../utils/db.service';
import { Utils } from 'src/utils/utils.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService, private utils: Utils) {}

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
    this.dbService.deleteOne('favorites/tracks', trackId);

    this.utils.nullAnyMention('albums', {
      nameId: 'trackId',
      valueId: trackId,
    });

    this.utils.nullAnyMention('artists', {
      nameId: 'trackId',
      valueId: trackId,
    });

    this.dbService.deleteOne('tracks', trackId);
  }
}
