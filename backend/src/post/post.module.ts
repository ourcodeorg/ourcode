import { Module } from '@nestjs/common';
import { Postservice } from './post.service';
import { Postcontroller } from './post.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Module({
  controllers: [Postcontroller],
  providers: [Postservice, PrismaService, ApplicationsService],
})
export class PostModule {}
