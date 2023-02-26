import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleUnprocessable } from 'src/utils/errorHandlers';
import { FavoritesService } from './favorites.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('favs')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(
    private favs: FavoritesService,
    private artist: ArtistService,
    private track: TrackService,
    private album: AlbumService,
  ) {}

  @Get()
  async getFavs() {
    return this.favs.getFavs();
  }

  @Post('/track/:trackId')
  async addTrackToFavs(@Param('trackId', ParseUUIDPipe) trackId: any) {
    const track = await this.track.getTrack(trackId);
    console.log(track);
    await handleUnprocessable(track);

    await this.favs.addToFavs('track', trackId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  async removeTrackFromFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const faved = await this.favs.getFav('track', trackId);
    await handleUnprocessable(faved);

    await this.favs.deleteFav('track', trackId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/artist/:artistId')
  async addArtistToFavs(@Param('artistId', ParseUUIDPipe) artistId: any) {
    const artist = await this.artist.getArtist(artistId);
    await handleUnprocessable(artist);

    await this.favs.addToFavs('artist', artistId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  async removeArtistFromFavs(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const faved = await this.favs.getFav('artist', artistId);
    await handleUnprocessable(faved);

    await this.favs.deleteFav('artist', artistId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/album/:albumId')
  async addAlbumToFavs(@Param('albumId', ParseUUIDPipe) albumId: any) {
    const album = await this.album.getAlbum(albumId);
    await handleUnprocessable(album);

    await this.favs.addToFavs('album', albumId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/album/:albumId')
  @HttpCode(204)
  async removeAlbumFromFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const faved = await this.favs.getFav('album', albumId);
    await handleUnprocessable(faved);

    await this.favs.deleteFav('album', albumId);
    return { message: 'Successfully removed from favorites' };
  }
}
