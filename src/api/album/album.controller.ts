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
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get('/:albumId')
  getAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    handleNotFound(album);
    return album;
  }

  @Post()
  createAlbum(@Body() createAlbumDto: AlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put('/:albumId')
  updateAlbum(
    @Body() updateAlbumDto: AlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ) {
    const album = this.albumService.getAlbum(albumId);
    handleNotFound(album);
    return this.albumService.updateAlbum(updateAlbumDto, albumId);
  }

  @Delete('/:albumId')
  @HttpCode(204)
  deleteAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    handleNotFound(album);
    this.albumService.deleteAlbum(albumId);
    return { message: 'Album deleted successfully' };
  }
}
