import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    return await this.prisma.artist.findMany();
  }
  async getArtist(artistId: string) {
    return await this.prisma.artist.findUnique({ where: { id: artistId } });
  }

  async createArtist(createArtistDto: ArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async updateArtist(updateObj, artistId: string) {
    return await this.prisma.artist.update({
      where: {
        id: artistId,
      },
      data: updateObj,
    });
  }

  async deleteArtist(artistId: string) {
    return await this.prisma.artist.delete({ where: { id: artistId } });
  }
}
