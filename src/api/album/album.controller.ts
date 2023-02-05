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
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get('/:albumId')
  async getAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.albumService.getAlbum(albumId);
    await handleNotFound(album);
    return album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put('/:albumId')
  async updateAlbum(
    @Body() updateAlbumDto: AlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ) {
    const album = await this.albumService.getAlbum(albumId);
    await handleNotFound(album);
    return await this.albumService.updateAlbum(updateAlbumDto, albumId);
  }

  @Delete('/:albumId')
  @HttpCode(204)
  async deleteAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = await this.albumService.getAlbum(albumId);
    await handleNotFound(album);
    await this.albumService.deleteAlbum(albumId);
    return { message: 'Album deleted successfully' };
  }
}
