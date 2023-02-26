import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';
import { AuthGuard } from '../auth/auth.guard';

@Controller('artist')
@UseGuards(AuthGuard)
export class ArtistController {
  constructor(private artist: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artist.getArtists();
  }

  @Get('/:artistId')
  async getArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.artist.getArtist(artistId);
    await handleNotFound(artist);
    return artist;
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return await this.artist.createArtist(createArtistDto);
  }
  @Put('/:artistId')
  async updateArtist(
    @Body() updateArtistDto: ArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = await this.artist.getArtist(artistId);

    await handleNotFound(artist);

    return await this.artist.updateArtist(updateArtistDto, artistId);
  }

  @Delete('/:artistId')
  @HttpCode(204)
  async deleteArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.artist.getArtist(artistId);

    await handleNotFound(artist);
    await this.artist.deleteArtist(artistId);
    return { message: 'Artist deleted successfully' };
  }
}
