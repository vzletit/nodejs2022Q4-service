import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Module({
  providers: [
    FavoritesService,
    PrismaService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
