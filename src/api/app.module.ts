import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerModule } from '../custom-logger/custom-logger.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggingMiddleware } from 'src/custom-logger/custom-logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService, LoggingMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
