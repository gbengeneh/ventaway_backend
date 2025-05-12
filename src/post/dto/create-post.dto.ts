// src/post/dto/create-post.dto.ts
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export class CreatePostDto {
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
