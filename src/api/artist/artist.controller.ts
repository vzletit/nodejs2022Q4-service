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
    return await this.prisma.artist.findMany();
  }

  @Get('/:artistId')
  async getArtist(@Param('artistId', ParseUUIDPipe) artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    await handleNotFound(artist);
    return artist;
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  @Put('/:artistId')
  async updateArtist(
    @Body() updateArtistDto: ArtistDto,
    @Param('artistId', ParseUUIDPipe) artistId: string,
  ) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    await handleNotFound(artist);

    return await this.prisma.artist.update({
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
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    await handleNotFound(artist);
    await this.prisma.artist.delete({ where: { id: artistId } });
    return { message: 'Artist deleted successfully' };
  }
}
