/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import zod from 'zod';
import 'dotenv/config';

const envSchema = zod.object({
  JWT_SECRET: zod.string({
    required_error: 'JWT_SECRET is not provided in environment variable',
  }),
  NODE_ENV: zod.enum(['development', 'production', 'test'], {
    required_error: 'NODE_ENV is not provided in environment variable',
  }),
});

const res = envSchema.safeParse(process.env);
if (res.success === false) {
  throw new Error(res.error.message);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends zod.infer<typeof envSchema> {}
  }
}
export const JWT_SECRET = process.env.JWT_SECRET;
