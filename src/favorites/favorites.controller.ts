import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ParseUUIDPipe,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

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
    if (!track) {
      throw new UnprocessableEntityException(`Track ID ${trackId} not found`);
    }
    const favTracks = this.favoritesService.getFavsByType('tracks');
    if (favTracks.includes(trackId)) {
      throw new UnprocessableEntityException(
        `Track ID ${trackId} is already in favorites`,
      );
    }

    return this.favoritesService.addToFavs('tracks', trackId);
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  removeTrackFromFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const track = this.trackService.getTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(`Track ID ${trackId} not found`);
    }
    const favTracks = this.favoritesService.getFavsByType('tracks');
    if (!favTracks.includes(trackId)) {
      throw new NotFoundException(`Track ID ${trackId} was not in favorites`);
    }
    return this.favoritesService.removeFromFavs('tracks', trackId);
  }

  @Post('/album/:albumId')
  addAlbumToFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(`Album ID ${albumId} not found`);
    }
    const favAlbums = this.favoritesService.getFavsByType('albums');
    if (favAlbums.includes(albumId)) {
      throw new UnprocessableEntityException(
        `Album ID ${albumId} is already in favorites`,
      );
    }

    return this.favoritesService.addToFavs('albums', albumId);
  }

  @Delete('/album/:albumId')
  @HttpCode(204)
  removeAlbumFromFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(`Album ID ${albumId} not found`);
    }
    const favAlbums = this.favoritesService.getFavsByType('albums');
    if (!favAlbums.includes(albumId)) {
      throw new NotFoundException(`Album ID ${albumId} was not in favorites`);
    }

    return this.favoritesService.removeFromFavs('albums', albumId);
  }

  @Post('/artist/:artistId')
  addArtistToFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist ID ${artistId} not found`);
    }
    const favArtists = this.favoritesService.getFavsByType('artists');
    if (favArtists.includes(artistId)) {
      throw new UnprocessableEntityException(
        `Artist ID ${artistId} is already in favorites`,
      );
    }

    return this.favoritesService.addToFavs('artists', artistId);
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  removeArtistFromFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist ID ${artistId} not found`);
    }
    const favArtists = this.favoritesService.getFavsByType('artists');
    if (!favArtists.includes(artistId)) {
      throw new NotFoundException(`Artist ID ${artistId} was not in favorites`);
    }

    return this.favoritesService.removeFromFavs('artists', artistId);
  }
}
