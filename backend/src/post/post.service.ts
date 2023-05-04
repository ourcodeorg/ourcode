import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO, UpdatePostDto } from './dto/post.dto';
import { PrismaService } from '../services/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class Postservice {
  constructor(private prisma: PrismaService) { }

  async create(createPostDto: CreatePostDTO): Promise<Post> {
    createPostDto.userId = createPostDto.user.id;
    delete createPostDto.user;
    try {
      const post = await this.prisma.post.create({
        data: createPostDto as unknown as Post
      });
      return post;
    } catch {
      throw new HttpException(
        "Could not create new post",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.prisma.post.findMany()
      return posts
    } catch {
      throw new HttpException(
        "Could not find posts",
        HttpStatus.NOT_FOUND
      )
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = this.prisma.post.findUniqueOrThrow({
        where: { id }
      });
      return post;
    } catch {
      throw new HttpException(
        "Post not found",
        HttpStatus.NOT_FOUND
      )
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.prisma.post.findUniqueOrThrow({
        where: { id }
      })
      if (post.userId !== updatePostDto.user.id) {
        throw new HttpException(
          "Cannot update post of another user",
          HttpStatus.UNAUTHORIZED
        )
      } else {
        delete updatePostDto.user
        const updatedPost = this.prisma.post.update({
          where: { id },
          data: updatePostDto as unknown as Partial<Post>
        })
        return updatedPost
      }
    } catch {
      throw new HttpException(
        "Post not found",
        HttpStatus.NOT_FOUND
      )
    }
  }

  async remove(id: string): Promise<Post> {
    try {
      const deletedPost = this.prisma.post.delete({
        where: { id }
      })
      return deletedPost
    } catch {
      throw new HttpException(
        "Post not found",
        HttpStatus.NOT_FOUND
      )
    }
  }
}
