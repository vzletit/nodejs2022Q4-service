import { TrackDto } from 'src/track/dto/track-dto';
import { AlbumDto } from 'src/album/dto/album-dto';
import { ArtistDto } from 'src/artist/dto/artist-dto';
import { UserDto } from 'src/user/dto/user-dto';

type Id = string;

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

interface Db {
  users: UserDto[];
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
  favorites: {
    artists: Id[];
    albums: Id[];
    tracks: Id[];
  };
}

type Entity = UserDto | AlbumDto | ArtistDto | TrackDto;
