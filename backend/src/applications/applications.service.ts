import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDTO } from './dto/application.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Application, Post, User } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(
    createApplicationDto: CreateApplicationDTO,
  ): Promise<Application> {
    try {
      let existingApplication: Application =
        await this.prismaService.application.findFirst({
          where: {
            userId: createApplicationDto.user.id,
            postId: createApplicationDto.postId,
          },
        });
      if (existingApplication) {
        throw new HttpException(
          'Already applied to post',
          HttpStatus.FORBIDDEN,
        );
      }
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id: createApplicationDto.postId },
      });
      if (post.id === createApplicationDto.user.id) {
        throw new HttpException(
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
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Application> {
    try {
      return await this.prismaService.application.findUniqueOrThrow({
        where: { id },
      });
    } catch {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string, user: User): Promise<Application> {
    try {
      const application: Application =
        await this.prismaService.application.findUniqueOrThrow({
          where: { id },
        });
      if (application.userId === user.id) {
        return await this.prismaService.application.delete({ where: { id } });
      } else {
        throw new HttpException(
          "Cannot delete someone else's application",
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async archive(id: string, user: User): Promise<Application> {
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
        throw new HttpException(
          'Cannot archive application of post you are not the owner of',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async unarchive(id: string, user: User): Promise<Application> {
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
        throw new HttpException(
          'Cannot unarchive application of post you are not the owner of',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
  }

  async getApplicationsByPostId(postId: string): Promise<Application[]> {
    try {
      const applications: Application[] =
        await this.prismaService.application.findMany({
          where: { postId },
        });
      return applications;
    } catch {
      throw new HttpException(
        'Could not fetch applications for the post',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
