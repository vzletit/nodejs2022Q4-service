import { PrismaService } from 'src/prisma/prisma.service';
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
import { ArtistDto } from './dto/artist.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { handleNotFound } from 'src/utils/errorHandlers';

@Controller('/artist')
export class ArtistController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getArtists() {
    return await this.prisma.artists.findMany();
  }

  @Get('/:artistId')
  async getArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.prisma.artists.findUnique({
      where: { id: artistId },
    });
    handleNotFound(artist);
    return artist;
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return await this.prisma.artists.create({ data: createArtistDto });
  }

  @Put('/:artistId')
  async updateArtist(
    @Body() updateArtistDto: ArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = await this.prisma.artists.findUnique({
      where: { id: artistId },
    });

    handleNotFound(artist);

    return await this.prisma.artists.update({
      where: {
        id: artistId,
      },
      data: {
        ...updateArtistDto,
      },
    });
  }

  @Delete('/:artistId')
  @HttpCode(204)
  async deleteArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.prisma.artists.findUnique({
      where: { id: artistId },
    });

    handleNotFound(artist);
    await this.prisma.artists.delete({ where: { id: artistId } });
    return { message: 'Artist deleted successfully' };
  }
}
