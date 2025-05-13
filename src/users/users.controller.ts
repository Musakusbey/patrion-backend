import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  testRoute() {
    return { message: 'Users route is working.' };
  }
}
