import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { DbService } from '../../utils/db.service';
import { Utils } from 'src/utils/utils.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService, private utils: Utils) {}

  async getArtists() {
    return await this.dbService.getMany('artists');
  }

  async getArtist(artistId: string) {
    return await this.dbService.getOne('artists', artistId);
  }

  async createArtist(createArtistDto: ArtistDto) {
    return await this.dbService.addOne('artists', {
      ...createArtistDto,
      id: randomUUID(),
    });
  }

  async updateArtist(updateArtistDto: ArtistDto, artistId: string) {
    return await this.dbService.updateOne('artists', artistId, {
      ...updateArtistDto,
    });
  }

  async deleteArtist(artistId: string) {
    await this.dbService.deleteOne('favorites/artists', artistId);

    this.utils.nullAnyMention('tracks', {
      nameId: 'artistId',
      valueId: artistId,
    });

    this.utils.nullAnyMention('albums', {
      nameId: 'artistId',
      valueId: artistId,
    });

    await this.dbService.deleteOne('artists', artistId);
  }
}
