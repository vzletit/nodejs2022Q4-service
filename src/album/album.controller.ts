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
import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto } from './dto/update-album-dto';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get('/:albumId')
  getUser(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    if (!album) {
      throw new NotFoundException(`Album ID ${albumId} not found`);
    }
    return album;
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put('/:albumId')
  updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('albumId', ParseUUIDPipe) albumId: string,
  ) {
    const album = this.albumService.getAlbum(albumId);
    if (!album) {
      throw new NotFoundException(`Album ID ${albumId} not found`);
    }
    return this.albumService.updateAlbum(updateAlbumDto, albumId);
  }

  @Delete('/:albumId')
  @HttpCode(204)
  deleteAlbum(@Param('albumId', ParseUUIDPipe) albumId: string) {
    const album = this.albumService.getAlbum(albumId);
    if (!album) {
      throw new NotFoundException(`Album ID ${albumId} not found`);
    }

    this.albumService.deleteAlbum(albumId);
    return { message: 'Album deleted successfully' };
  }
}
