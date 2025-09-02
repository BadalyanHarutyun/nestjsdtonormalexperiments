// src/posts/dto/create-post.dto.ts
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsNumber()
  id: number;
  @IsString()
  content: string;

  @IsString()
  authorName: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
