import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserMiddleware } from './auth/middleware/user.middleware';
import { ApplicationsModule } from './applications/applications.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [AuthModule, PostModule, ApplicationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'auth/users/:id', method: RequestMethod.GET },
        { path: 'auth/(.*)', method: RequestMethod.POST },
        { path: 'posts/', method: RequestMethod.GET },
        { path: 'posts/:id', method: RequestMethod.GET },
        { path: '/', method: RequestMethod.GET },
        { path: '', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
