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
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

@Controller('/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return this.artistService.getArtists();
  }

  @Get('/:artistId')
  async getUser(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.artistService.getArtist(artistId);
    await handleNotFound(artist);
    return artist;
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put('/:artistId')
  async updateArtist(
    @Body() updateArtistDto: ArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = await this.artistService.getArtist(artistId);
    await handleNotFound(artist);
    return await this.artistService.updateArtist(updateArtistDto, artistId);
  }

  @Delete('/:artistId')
  @HttpCode(204)
  async deleteArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.artistService.getArtist(artistId);
    await handleNotFound(artist);
    await this.artistService.deleteArtist(artistId);
    return { message: 'Artist deleted successfully' };
  }
}
