// src/post/dto/update-post.dto.ts
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { MediaType } from '@prisma/client';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;

  @IsOptional()
  @IsUrl()
  mediaUrl?: string;
}
