import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumDto } from './dto/album.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

@Controller('album')
export class AlbumController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAlbums() {
    return await this.prisma.album.findMany();
  }

  @Get('/:albumId')
  async getAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    await handleNotFound(album);
    return album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }
  @Put('/:albumId')
  async updateAlbum(
    @Body() updateAlbumDto: AlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    await handleNotFound(album);

    return await this.prisma.album.update({
      where: {
        id: albumId,
      },
      data: {
        ...updateAlbumDto,
      },
    });
  }

  @Delete('/:albumId')
  @HttpCode(204)
  async deleteAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    await handleNotFound(album);
    await this.prisma.album.delete({ where: { id: albumId } });
    return { message: 'Album deleted successfully' };
  }
}
