// src/posts/dto/create-post.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  authorName: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}