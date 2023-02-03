import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist-dto';
import { UpdateArtistDto } from './dto/update-artist-dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  getArtists() {
    // return { message: 'All artists' };
    //return this.dbService.getUsers();
  }

  getArtist(artistId: string) {
    return { artistId, message: 'Artist by id' };
  }

  createArtist(createUserDto: CreateArtistDto) {
    console.log('CREATE Artist', createUserDto);
    return { message: 'create Artist' };
  }

  updateArtist(updatePassword: UpdateArtistDto, artistId: string) {
    return { artistId, message: 'password updated' };
  }

  deleteArtist(artistId: string) {
    return { artistId, message: 'Artist deleted' };
  }
}
