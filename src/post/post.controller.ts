// src/post/post.controller.ts
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Delete,
    Put,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { PostService } from './post.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { JwtGuard } from '../auth/guards/jwt.guard';
  
  @Controller('posts')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    // Create a post
    @UseGuards(JwtGuard)
    @Post()
    create(@Body() dto: CreatePostDto, @Req() req) {
      return this.postService.create(req.user.sub, dto);
    }
  
    // Get all posts for a user
    @Get('user/:userId')
    findAll(@Param('userId') userId: string) {
      return this.postService.findAll(userId);
    }
  
    // Get a post by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.postService.findOne(id);
    }
  
    // Update a post
    @UseGuards(JwtGuard)
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() dto: UpdatePostDto,
      @Req() req,
    ) {
      return this.postService.update(req.user.sub, id, dto);
    }
  
    // Delete a post
    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
      return this.postService.remove(req.user.sub, id);
    }
  }
  