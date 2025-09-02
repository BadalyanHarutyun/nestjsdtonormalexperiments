import { Controller, Get, Query } from '@nestjs/common';
import { AppService, CreateUserDto } from './app.service';
import { Posts } from './post.entity';
import { CreatePostDto } from './create-post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query() q: CreateUserDto): Promise<CreateUserDto[]> {
    return this.appService.getDto(q);
  }
  @Get('/normal')
  async getNormal(): Promise<Posts[]> {
    return await this.appService.getPosts();
  }
  @Get('/dto')
  async getDto(): Promise<CreatePostDto[]> {
    return await this.appService.getPostsWithDto();
  }
}
