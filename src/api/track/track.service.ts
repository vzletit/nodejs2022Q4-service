import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TrackDto } from './dto/track.dto';
import { DbService } from '../../utils/db.service';
import { Utils } from 'src/utils/utils.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService, private utils: Utils) {}

  async getTracks() {
    return await this.dbService.getMany('tracks');
  }

  async getTrack(trackId: string) {
    return await this.dbService.getOne('tracks', trackId);
  }

  async createTrack(createTrackDto: TrackDto) {
    return await this.dbService.addOne('tracks', {
      ...createTrackDto,
      id: randomUUID(),
    });
  }

  async updateTrack(updateTrackDto: TrackDto, trackId: string) {
    return this.dbService.updateOne('tracks', trackId, {
      ...updateTrackDto,
    });
  }

  async deleteTrack(trackId: string) {
    await this.dbService.deleteOne('favorites/tracks', trackId);

    this.utils.nullAnyMention('albums', {
      nameId: 'trackId',
      valueId: trackId,
    });

    this.utils.nullAnyMention('artists', {
      nameId: 'trackId',
      valueId: trackId,
    });

    await this.dbService.deleteOne('tracks', trackId);
  }
}
