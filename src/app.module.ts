import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ArtistService } from './artist/artist.service';
import { TrackService } from './track/track.service';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    TrackController,
  ],
  providers: [AppService, UserService, DbService, ArtistService, TrackService],
})
export class AppModule {}
