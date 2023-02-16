import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoritesController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
