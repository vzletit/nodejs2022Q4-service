import { PrismaService } from 'src/prisma/prisma.service';
import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound, handleUnprocessable } from 'src/utils/errorHandlers';

@Controller('favs')
export class FavoritesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getFavs() {
    return {
      artists: await this.prisma.artist.findMany({
        where: { favorite: { isNot: null } },
      }),
      albums: await this.prisma.album.findMany({
        where: { favorite: { isNot: null } },
      }),
      tracks: await this.prisma.track.findMany({
        where: { favorite: { isNot: null } },
      }),
    };
  }

  @Post('/track/:trackId')
  async addTrackToFavs(@Param('trackId', ParseUUIDPipe) trackId: any) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    await handleUnprocessable(track);

    await this.prisma.trackFav.create({ data: { trackId } });
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  async removeTrackFromFavs(@Param('trackId', ParseUUIDPipe) trackId: string) {
    const faved = await this.prisma.trackFav.findUnique({
      where: { trackId },
    });

    await handleUnprocessable(faved);

    await this.prisma.trackFav.delete({ where: { trackId } });
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/album/:albumId')
  async addAlbumToFavs(@Param('albumId', ParseUUIDPipe) albumId: any) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    await handleUnprocessable(album);

    await this.prisma.albumFav.create({ data: { albumId } });
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/album/:albumId')
  @HttpCode(204)
  async removeAlbumFromFavs(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const faved = await this.prisma.albumFav.findUnique({
      where: { albumId },
    });

    await handleUnprocessable(faved);

    await this.prisma.albumFav.delete({ where: { albumId } });
    return { message: 'Successfully removed from favorites' };
  }

  @Post('/artist/:artistId')
  async addArtistToFavs(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    await handleUnprocessable(artist);

    await this.prisma.artistFav.create({ data: { artistId } });
    return { message: 'Successfully added to favorites' };
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  async removeArtistFromFavs(
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const faved = await this.prisma.artistFav.findUnique({
      where: { artistId },
    });

    await handleUnprocessable(faved);

    await this.prisma.artistFav.delete({ where: { artistId } });
    return { message: 'Successfully removed from favorites' };
  }
}
