import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO, UpdatePostDto } from './dto/post.dto';
import { PrismaService } from '../database/prisma.service';
import { Application, Post, User } from '@prisma/client';
import { ApplicationsService } from 'src/applications/applications.service';
import { CreateApplicationDTO } from 'src/applications/dto/application.dto';
import { HttpError } from 'src/error';

@Injectable()
export class Postservice {
  constructor(
    private prisma: PrismaService,
    private readonly applicationService: ApplicationsService,
  ) {}

  async create(createPostDto: CreatePostDTO): Promise<Post> {
    createPostDto.userId = createPostDto.user.id;
    delete createPostDto.user;
    try {
      const post = await this.prisma.post.create({
        data: createPostDto as unknown as Post,
      });
      return post;
    } catch {
      throw new HttpException(
        'Could not create new post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number = 1, limit: number = 20): Promise<Post[]> {
    try {
      const offset = (page - 1) * limit;
      const posts = await this.prisma.post.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts;
    } catch {
      throw new HttpException('Could not find posts', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = this.prisma.post.findUniqueOrThrow({
        where: { id },
      });
      return post;
    } catch {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) throw new HttpError('Post not found', HttpStatus.NOT_FOUND);
      if (post.userId == updatePostDto.user.id) {
        delete updatePostDto.user;
        const updatedPost = this.prisma.post.update({
          where: { id },
          data: updatePostDto as unknown as Partial<Post>,
        });
        return updatedPost;
      } else {
        throw new HttpError(
          'Cannot update post of another user',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(id: string, user: User): Promise<Post> {
    try {
      let post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) throw new HttpError('Post not found', HttpStatus.NOT_FOUND);
      if (post.id == user.id) {
        let deleted = await this.prisma.post.delete({
          where: { id },
        });
        return deleted;
      } else {
        throw new HttpError(
          'Cannot delete post of another user',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async apply(id: string, createApplicationDTO: CreateApplicationDTO) {
    return await this.applicationService.create(id, createApplicationDTO);
  }

  async getApplications(id: string, user: User): Promise<Application[]> {
    try {
      const post: Post = await this.prisma.post.findUnique({
        where: { id },
      });
      if (!post) throw new HttpError('Post not found', HttpStatus.NOT_FOUND);
      if (post.userId === user.id) {
        return await this.applicationService.getApplicationsByPostId(id);
      } else {
        throw new HttpError(
          'Cannot see applications of post that is not yours',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
