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

@Controller('/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()

  // GET /artist - get all artists
  // Server should answer with status code 200 and all artists records
  getArtists() {
    return this.artistService.getArtists();
  }

  // GET /artist/:id - get single artist by id
  // Server should answer with status code 200 and and record with id === artistId if it exists
  // Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist

  @Get('/:artistId')
  getArtist(@Param('artistId') artistId: string) {
    return this.artistService.getArtist(artistId);
  }
  // POST /artist - create new artist
  // Server should answer with status code 201 and newly created record if request is valid
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  // PUT /artist/:id - update artist info
  // Server should answer with status code 200 and updated record if request is valid
  // Server should answer with status code 400 and corresponding message if artist is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist

  @Put('/:artistId')
  updateArtist(
    @Body() updatePasswordDto: UpdateArtistDto,
    @Param('artistId') artistId: string,
  ) {
    return this.artistService.updateArtist(updatePasswordDto, artistId);
  }

  // DELETE /artist/:id - delete artist
  // Server should answer with status code 204 if the record is found and deleted
  // Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist

  @Delete('/:artistId')
  deleteArtist(@Param('artistId') artistId: string) {
    return this.artistService.deleteArtist(artistId);
  }
}
