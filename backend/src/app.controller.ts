import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
// import { UserService } from './users/users.service';
// import { CreateUserDTO } from './dto/create_user.dto';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
