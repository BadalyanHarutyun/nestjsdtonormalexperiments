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
  @MinLength(2)
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getDto(crt: any): Promise<CreateUserDtoRes[]> {
    console.log(2222, crt);
    const arr: CreateUserDto[] = [];
    for (let i = 0; i < 212; i++) {
      const data: CreateUserDto = new CreateUserDtoRes(crt.email, crt.password);

      console.log(334534, data, data.password.length);
      const errors: ValidationError[] = await validate(data);
      if (errors.length) {
        console.log(44444, errors);
        throw new BadRequestException(errors);
      }
      arr.push(data);
    }
    return arr;
  }
  async getPosts(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }
  async getPostsWithDto(): Promise<CreatePostDto[]> {
    const bigArr = await this.postsRepository.find();
    const arr: CreatePostDto[] = [];
    for (let i = 0; i < bigArr.length; i++) {
      const el = bigArr[i];
      const data = new CreatePostDto();
      data.id = el.id;
      data.title = el.title;
      data.content = el.content;
      data.authorName = el.authorName;
      data.createdAt = el.createdAt;
      data.updatedAt = el.updatedAt;
      data.isPublished = el.isPublished;

      const errors: ValidationError[] = await validate(data);
      if (errors.length) {
        console.log(44444, errors);
        throw new BadRequestException(errors);
      }
      arr.push(data);
    }
    return arr;
  }
  // async validateUserManually(
  //   userData: Partial<CreateUserDto>,
  // ): Promise<ValidationResult> {
  //   const userDto = Object.assign(new CreateUserDto(), userData);

  //   const errors: ValidationError[] = await validate(userDto);

  //   if (errors.length > 0) {
  //     const errorMessages = errors.flatMap((error) =>
  //       Object.values(error.constraints || {}),
  //     );

  //     return {
  //       isValid: false,
  //       errors: errorMessages,
  //     };
  //   }

  //   return {
  //     isValid: true,
  //     data: userDto,
  //   };
  // }

  // // Example usage with test data
  // async testValidation(): Promise<void> {
  //   // Test invalid email
  //   const invalidResult = await this.validateUserManually({
  //     email: 'invalid-email',
  //     password: 'password',
  //   });
  //   console.log('Invalid result:', invalidResult);

  //   // Test valid data
  //   const validResult = await this.validateUserManually({
  //     email: 'test@example.com',
  //     password: 'password123',
  //   });
  //   console.log('Valid result:', validResult);
  // }
}
