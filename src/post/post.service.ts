// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Create a new post
  async create(userId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        content: dto.content,
        mediaType: dto.mediaType,
        mediaUrl: dto.mediaUrl,
        userId,
      },
    });
  }

  // Find all posts by a user
  async findAll(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        likes: true,
      },
    });
  }

  // Find a post by ID
  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        likes: true,
      },
    });
  }

  // Update a post
  async update(userId: string, postId: string, dto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.userId !== userId) {
      throw new Error('Unauthorized or post not found');
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        content: dto.content ?? post.content,
        mediaType: dto.mediaType ?? post.mediaType,
        mediaUrl: dto.mediaUrl ?? post.mediaUrl,
      },
    });
  }

  // Delete a post
  async remove(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.userId !== userId) {
      throw new Error('Unauthorized or post not found');
    }
    return this.prisma.post.delete({ where: { id: postId } });
  }
}
