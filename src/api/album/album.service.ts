import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany();
  }
  async getAlbum(albumId: string) {
    return await this.prisma.album.findUnique({ where: { id: albumId } });
  }

  async createAlbum(createAlbumDto: AlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async updateAlbum(updateObj, albumId: string) {
    return await this.prisma.album.update({
      where: {
        id: albumId,
      },
      data: updateObj,
    });
  }

  async deleteAlbum(albumId: string) {
    return await this.prisma.album.delete({ where: { id: albumId } });
  }
}
