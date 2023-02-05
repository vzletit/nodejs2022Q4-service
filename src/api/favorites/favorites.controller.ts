import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { TrackService } from 'src/api/track/track.service';
import { AlbumService } from 'src/api/album/album.service';
import { ArtistService } from 'src/api/artist/artist.service';
import { handleUnprocessable } from 'src/utils/errorHandlers';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  async getFavs() {
    return await this.favoritesService.getFavs();
  }

  @Post('/track/:trackId')
  async addTrackToFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.trackService.getTrack(trackId);
    await handleUnprocessable(track);

    await this.favoritesService.addToFavs('tracks', trackId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  async removeTrackFromFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = await this.trackService.getTrack(trackId);
    await handleUnprocessable(track);

    await this.favoritesService.removeFromFavs('tracks', trackId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/album/:albumId')
  async addAlbumToFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.albumService.getAlbum(albumId);
    await handleUnprocessable(album);

    await this.favoritesService.addToFavs('albums', albumId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/album/:albumId')
  @HttpCode(204)
  async removeAlbumFromFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.albumService.getAlbum(albumId);
    await handleUnprocessable(album);

    await this.favoritesService.removeFromFavs('albums', albumId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/artist/:artistId')
  async addArtistToFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.artistService.getArtist(artistId);
    await handleUnprocessable(artist);

    await this.favoritesService.addToFavs('artists', artistId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  async removeArtistFromFavs(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = await this.artistService.getArtist(artistId);
    await handleUnprocessable(artist);

    await this.favoritesService.removeFromFavs('artists', artistId);
    return { message: 'Successfully removed from favorites' };
  }
}
