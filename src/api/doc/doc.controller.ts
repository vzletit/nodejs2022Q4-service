import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Public()
@Controller('doc')
export class DocController {
  @Get()
  sayHello() {
    return `Hello. I'm public route /doc :)`;
  }
}
