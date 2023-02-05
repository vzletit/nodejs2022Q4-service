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
  getFavs() {
    return this.favoritesService.getFavs();
  }

  @Post('/track/:trackId')
  addTrackToFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    handleUnprocessable(track);

    this.favoritesService.addToFavs('tracks', trackId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  removeTrackFromFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    handleUnprocessable(track);

    this.favoritesService.removeFromFavs('tracks', trackId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/album/:albumId')
  addAlbumToFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    handleUnprocessable(album);

    this.favoritesService.addToFavs('albums', albumId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/album/:albumId')
  @HttpCode(204)
  removeAlbumFromFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    handleUnprocessable(album);

    this.favoritesService.removeFromFavs('albums', albumId);
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/artist/:artistId')
  addArtistToFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    handleUnprocessable(artist);

    this.favoritesService.addToFavs('artists', artistId);
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  removeArtistFromFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    handleUnprocessable(artist);

    this.favoritesService.removeFromFavs('artists', artistId);
    return { message: 'Successfully removed from favorites' };
  }
}
