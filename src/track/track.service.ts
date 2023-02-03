import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto } from './dto/update-track-dto';

@Injectable()
export class TrackService {
  getTracks() {
    return { message: 'All tracks' };
  }

  getTrack(trackId: string) {
    return { trackId, message: 'Track by id' };
  }

  createTrack(createUserDto: CreateTrackDto) {
    console.log('CREATE Track', createUserDto);
    return { message: 'create Track' };
  }

  updateTrack(updatePassword: UpdateTrackDto, trackId: string) {
    return { trackId, message: 'password updated' };
  }

  deleteTrack(trackId: string) {
    return { trackId, message: 'Track deleted' };
  }
}
