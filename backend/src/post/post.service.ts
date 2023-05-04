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

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
