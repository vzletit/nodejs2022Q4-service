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
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';

@Controller('/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get('/:artistId')
  getUser(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist ID ${artistId} not found`);
    }
    return artist;
  }

  @Post()
  createArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put('/:artistId')
  updateArtist(
    @Body() updateArtistDto: ArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist ID ${artistId} not found`);
    }
    return this.artistService.updateArtist(updateArtistDto, artistId);
  }

  @Delete('/:artistId')
  @HttpCode(204)
  deleteArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist ID ${artistId} not found`);
    }

    this.artistService.deleteArtist(artistId);
    return { message: 'Artist deleted successfully' };
  }
}
