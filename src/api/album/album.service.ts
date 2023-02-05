import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DbService } from '../../utils/db.service';
import { Utils } from 'src/utils/utils.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService, private utils: Utils) {}

  getAlbums() {
    return this.dbService.getMany('albums');
  }

  getAlbum(albumId: string) {
    return this.dbService.getOne('albums', albumId);
  }

  createAlbum(createAlbumDto: AlbumDto) {
    return this.dbService.addOne('albums', {
      ...createAlbumDto,
      id: randomUUID(),
    });
  }

  updateAlbum(updateAlbumDto: AlbumDto, albumId: string) {
    return this.dbService.updateOne('albums', albumId, {
      ...updateAlbumDto,
    });
  }

  deleteAlbum(albumId: string) {
    this.dbService.deleteOne('favorites/albums', albumId);

    this.utils.nullAnyMention('tracks', {
      nameId: 'albumId',
      valueId: albumId,
    });

    this.utils.nullAnyMention('artists', {
      nameId: 'albumId',
      valueId: albumId,
    });

    this.dbService.deleteOne('albums', albumId);
  }
}
