import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDTO } from './dto/application.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Application, Post, User } from '@prisma/client';
import { HttpError } from 'src/error';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    id: string,
    createApplicationDto: CreateApplicationDTO,
  ): Promise<Application> {
    try {
      let existingApplication: Application =
        await this.prismaService.application.findFirst({
          where: {
            userId: createApplicationDto.user.id,
            postId: id,
          },
        });
      if (existingApplication) {
        throw new HttpError('Already applied to post', HttpStatus.CONFLICT);
      }
      const post: Post = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!post) throw new HttpError('Post not found', HttpStatus.NOT_FOUND);
      if (post.userId === createApplicationDto.user.id) {
        throw new HttpError('Cannot apply to own post', HttpStatus.CONFLICT);
      }
      const application: Application =
        await this.prismaService.application.create({
          data: {
            postId: post.id,
            userId: createApplicationDto.user.id,
          },
        });
      await this.prismaService.post.update({
        where: { id: post.id },
        data: {
          peopleApplied: { increment: 1 },
        },
      });
      return application;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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

  async remove(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUnique({
          where: { id },
        });
      if (!application)
        throw new HttpError('Application not found', HttpStatus.NOT_FOUND);
      if (application.userId === user.id) {
        this.prismaService.post.update({
          where: { id: application.postId },
          data: { peopleApplied: { decrement: 1 } }
        });
        return await this.prismaService.application.delete({ where: { id } });
      } else {
        throw new HttpError(
          'Cannot delete someone elses application',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch(error) {
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

  async archive(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUnique({
          where: { id },
        });
      if (!application)
        throw new HttpError('Application not found', HttpStatus.NOT_FOUND);
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id: application.postId },
      });
      if (post.userId === user.id) {
        return await this.prismaService.application.update({
          where: { id },
          data: { archived: true },
        });
      } else {
        throw new HttpError(
          'Cannot archive application of post you are not the owner of',
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

  async unarchive(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUnique({
          where: { id },
        });
      if (!application)
        throw new HttpError('Application not found', HttpStatus.NOT_FOUND);
      const post: Post = await this.prismaService.post.findUniqueOrThrow({
        where: { id: application.postId },
      });
      if (post.userId === user.id) {
        return await this.prismaService.application.update({
          where: { id },
          data: { archived: false },
        });
      } else {
        throw new HttpError(
          'Cannot unarchive application of post you are not the owner of',
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

  async approveApplication(id: string, user: User) {
    try {
      const application: Application =
        await this.prismaService.application.findUnique({
          where: { id },
        });
      if (!application)
        throw new HttpError('Application not found', HttpStatus.NOT_FOUND);
      const post: Post = await this.prismaService.post.findUnique({
        where: { id: application.postId },
      });
      if (post) {
        if (post.userId === user.id) {
          this.prismaService.post.update({ 
            where: { id: post.id },
            data: { peopleAccepted: { increment: 1 } }
          })
          return await this.prismaService.application.update({
            where: { id },
            data: { approved: true },
          });
        } else {
          throw new HttpError(
            'Cannot approve application unless you created the post',
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        throw new HttpError('Post not found', HttpStatus.NOT_FOUND);
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

  async getApplicationsByPostId(postId: string): Promise<Application[]> {
    try {
      const applications: Application[] =
        await this.prismaService.application.findMany({
          where: { postId },
        });
      return applications;
    } catch {
      throw new HttpError(
        'Could not fetch applications for the post',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
