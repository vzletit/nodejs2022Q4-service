import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist-dto';
import { DbService } from '../utils/db.service';
import { Utils } from 'src/utils/utils.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService, private utils: Utils) {}

  getArtists() {
    return this.dbService.getMany('artists');
  }

  getArtist(artistId: string) {
    return this.dbService.getOne('artists', artistId);
  }

  createArtist(createArtistDto: ArtistDto) {
    return this.dbService.addOne('artists', createArtistDto);
  }

  updateArtist(updateArtistDto: ArtistDto, artistId: string) {
    return this.dbService.updateOne('artists', artistId, {
      ...updateArtistDto,
    });
  }

  deleteArtist(artistId: string) {
    this.dbService.deleteOne('favorites/artists', artistId);

    this.utils.nullAnyMention('tracks', {
      nameId: 'artistId',
      valueId: artistId,
    });

    this.utils.nullAnyMention('albums', {
      nameId: 'artistId',
      valueId: artistId,
    });

    this.dbService.deleteOne('artists', artistId);
  }
}
