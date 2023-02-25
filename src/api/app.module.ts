import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
//import { LoggingMiddleware } from 'src/middleware/loggingMiddleware.service';
import { LoggerModule } from '../custom-logger/custom-logger.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    //LoggingMiddleware
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggingMiddleware).forRoutes('*');
  // }
}
