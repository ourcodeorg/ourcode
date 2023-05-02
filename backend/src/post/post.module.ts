import { Module } from '@nestjs/common';
import { Postservice } from './post.service';
import { Postcontroller } from './post.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [Postcontroller],
  providers: [Postservice, PrismaService],
})
export class PostModule {}
