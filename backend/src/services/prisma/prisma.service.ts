import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
  constructor() {
    super({
      errorFormat: 'pretty',
      log:
        process.env.NODE_ENV === 'development'
          ? ['error', 'info', 'warn', 'query']
          : ['error', 'info', 'warn'],
    });
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
