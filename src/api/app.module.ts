import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoritesController,
  ],
  providers: [PrismaService, LoggingService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingService).forRoutes('*');
  }
}
