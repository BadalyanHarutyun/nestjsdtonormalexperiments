import { validate } from 'class-validator';
import { CreatePostDto } from '../create-post.dto';
import { BadRequestException } from '@nestjs/common';

export default async function (posts: any[]) {
  const arr: CreatePostDto[] = [];

  for (const el of posts) {
    const data = new CreatePostDto();
    data.id = el.id;
    data.title = el.title;
    data.content = el.content;
    data.authorName = el.authorName;
    data.createdAt = el.createdAt;
    data.updatedAt = el.updatedAt;
    data.isPublished = el.isPublished;

    const errors = await validate(data);
    if (errors.length) throw new BadRequestException(errors);
    arr.push(data);
  }

  return arr;
}
