import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist-dto';
import { UpdateArtistDto } from './dto/update-artist-dto';
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
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put('/:artistId')
  updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist ID ${artistId} not found`);
    }
    return this.artistService.updateArtist(updateArtistDto, artistId);
  }

  @Delete('/:artistId')
  deleteArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = this.artistService.getArtist(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist ID ${artistId} not found`);
    }

    this.artistService.deleteArtist(artistId);
    return { message: 'Artist deleted successfully' };
  }
}
