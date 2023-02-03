import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto } from './dto/update-album-dto';
import { DbService } from '../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  getAlbums() {
    return this.dbService.getMany('albums');
  }

  getAlbum(albumId: string) {
    return this.dbService.getOne('albums', albumId);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.dbService.addOne('albums', createAlbumDto);
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto, albumId: string) {
    return this.dbService.updateOne('albums', albumId, {
      ...updateAlbumDto,
    });
  }

  deleteAlbum(albumId: string) {
    this.dbService.deleteOne('albums', albumId);
  }
}
