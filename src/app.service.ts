import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  validate,
  ValidationError,
} from 'class-validator';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './create-post.dto';
import Piscina from 'piscina';
import { join } from 'path';

// ----------------------------
// DTOs
// ----------------------------
export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class CreateUserDtoRes {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(2, { message: 'Password must be at least 2 characters long' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

// ----------------------------
// Service
// ----------------------------
@Injectable()
export class AppService {
  private piscina: Piscina;

  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {
    // ✅ Create Piscina once and reuse
    this.piscina = new Piscina({
      filename: join(__dirname, './workers/posts.worker.js'),
      maxThreads: 8, // limit to prevent high RAM usage
      idleTimeout: 10000, // stop workers after 10s of inactivity
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  // ----------------------------
  // Example: Validate simple DTO manually
  // ----------------------------
  async getDto(crt: any): Promise<CreateUserDtoRes[]> {
    const arr: CreateUserDtoRes[] = [];

    for (let i = 0; i < 212; i++) {
      const data = new CreateUserDtoRes(crt.email, crt.password);

      const errors: ValidationError[] = await validate(data);
      if (errors.length) {
        throw new BadRequestException(errors);
      }
      arr.push(data);
    }

    return arr;
  }

  // ----------------------------
  // Return all posts (raw)
  // ----------------------------
  async getPosts(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  // ----------------------------
  // Normal DTO validation (main thread)
  // ----------------------------
  async getPostsWithDto(): Promise<CreatePostDto[]> {
    const bigArr = await this.postsRepository.find();
    const arr: CreatePostDto[] = [];

    for (const el of bigArr) {
      const data = new CreatePostDto();
      data.id = el.id;
      data.title = el.title;
      data.content = el.content;
      data.authorName = el.authorName;
      data.createdAt = el.createdAt;
      data.updatedAt = el.updatedAt;
      data.isPublished = el.isPublished;

      const errors = await validate(data);
      if (errors.length) {
        throw new BadRequestException(errors);
      }

      arr.push(data);
    }

    return arr;
  }

  // ----------------------------
  // Worker-thread version (non-blocking, memory-safe)
  // ----------------------------
  async getPostsWithDtoWorker(): Promise<CreatePostDto[]> {
    const bigArr = await this.postsRepository.find();

    // ✅ Reuse existing Piscina instance
    const data = await this.piscina.run(bigArr);

    console.log('First item:', data[0]);
    return data;
  }
}
