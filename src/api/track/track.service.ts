import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TrackDto } from './dto/track.dto';
import { DbService } from '../../utils/db.service';
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

  createTrack(createTrackDto: TrackDto) {
    return this.dbService.addOne('tracks', {
      ...createTrackDto,
      id: randomUUID(),
    });
  }

  updateTrack(updateTrackDto: TrackDto, trackId: string) {
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
