import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist-dto';
import { UpdateArtistDto } from './dto/update-artist-dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  getArtists() {
    return this.dbService.getMany('artists');
  }

  getArtist(artistId: string) {
    return this.dbService.getOne('artists', artistId);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    return this.dbService.addOne('artists', createArtistDto);
  }

  updateArtist(updateArtistDto: UpdateArtistDto, artistId: string) {
    return this.dbService.updateOne('artists', artistId, {
      ...updateArtistDto,
    });
  }

  deleteArtist(artistId: string) {
    this.dbService.deleteOne('artists', artistId);
  }
}
