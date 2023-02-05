import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DbService } from '../../utils/db.service';
import { Utils } from 'src/utils/utils.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService, private utils: Utils) {}

  async getAlbums() {
    return await this.dbService.getMany('albums');
  }

  async getAlbum(albumId: string) {
    return await this.dbService.getOne('albums', albumId);
  }

  async createAlbum(createAlbumDto: AlbumDto) {
    return await this.dbService.addOne('albums', {
      ...createAlbumDto,
      id: randomUUID(),
    });
  }

  async updateAlbum(updateAlbumDto: AlbumDto, albumId: string) {
    return await this.dbService.updateOne('albums', albumId, {
      ...updateAlbumDto,
    });
  }

  async deleteAlbum(albumId: string) {
    await this.dbService.deleteOne('favorites/albums', albumId);

    this.utils.nullAnyMention('tracks', {
      nameId: 'albumId',
      valueId: albumId,
    });

    this.utils.nullAnyMention('artists', {
      nameId: 'albumId',
      valueId: albumId,
    });

    await this.dbService.deleteOne('albums', albumId);
  }
}
