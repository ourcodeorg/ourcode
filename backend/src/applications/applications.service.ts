import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDTO } from './dto/application.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Application, Post, User } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    id: string,
    createApplicationDto: CreateApplicationDTO,
  ) {
    try {
      let existingApplication: Application =
        await this.prismaService.application.findFirst({
          where: {
            userId: createApplicationDto.user.id,
            postId: id,
          },
        });
      if (existingApplication) {
        return new HttpException(
          'Already applied to post',
          HttpStatus.FORBIDDEN,
        );
      }
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id },
      });
      if (post.userId === createApplicationDto.user.id) {
        return new HttpException(
          'Cannot apply to own post',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const application: Application =
        await this.prismaService.application.create({
          data: {
            postId: post.id,
            userId: createApplicationDto.user.id,
            archived: false,
          },
        });
      return application;
    } catch {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.application.findUniqueOrThrow({
        where: { id },
      });
    } catch {
      return new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUniqueOrThrow({
          where: { id },
        });
      if (application.userId === user.id) {
        return await this.prismaService.application.delete({ where: { id } });
      } else {
        return new HttpException(
          "Cannot delete someone else's application",
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      return new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async archive(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUniqueOrThrow({
          where: { id },
        });
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id: application.postId },
      });
      if (post.userId === user.id) {
        return await this.prismaService.application.update({
          where: { id },
          data: { archived: true },
        });
      } else {
        return new HttpException(
          'Cannot archive application of post you are not the owner of',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      return new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async unarchive(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUniqueOrThrow({
          where: { id },
        });
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id: application.postId },
      });
      if (post.userId === user.id) {
        return await this.prismaService.application.update({
          where: { id },
          data: { archived: false },
        });
      } else {
        return new HttpException(
          'Cannot unarchive application of post you are not the owner of',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      return new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async getApplicationsByPostId(postId: string) {
    try {
      const applications: Application[] =
        await this.prismaService.application.findMany({
          where: { postId },
        });
      return applications;
    } catch {
      return new HttpException(
        'Could not fetch applications for the post',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
