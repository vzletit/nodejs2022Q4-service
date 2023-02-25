import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.track.findMany();
  }
  async getTrack(trackId: string) {
    return await this.prisma.track.findUnique({ where: { id: trackId } });
  }

  async createTrack(createTrackDto: TrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async updateTrack(updateObj, trackId: string) {
    return await this.prisma.track.update({
      where: {
        id: trackId,
      },
      data: updateObj,
    });
  }

  async deleteTrack(trackId: string) {
    return await this.prisma.track.delete({ where: { id: trackId } });
  }
}
