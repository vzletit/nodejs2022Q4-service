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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

@Controller('album')
export class AlbumController {
  constructor(private album: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.album.getAlbums();
  }

  @Get('/:albumId')
  async getAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.album.getAlbum(albumId);
    await handleNotFound(album);
    return album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto) {
    return await this.album.createAlbum(createAlbumDto);
  }
  @Put('/:albumId')
  async updateAlbum(
    @Body() updateAlbumDto: AlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ) {
    const album = await this.album.getAlbum(albumId);

    await handleNotFound(album);

    return await this.album.updateAlbum(updateAlbumDto, albumId);
  }

  @Delete('/:albumId')
  @HttpCode(204)
  async deleteAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.album.getAlbum(albumId);

    await handleNotFound(album);
    await this.album.deleteAlbum(albumId);
    return { message: 'Album deleted successfully' };
  }
}
