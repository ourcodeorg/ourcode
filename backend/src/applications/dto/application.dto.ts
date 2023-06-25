import { User } from '@prisma/client';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreateApplicationDTO {
  @IsString()
  postId: string;

  @IsObject()
  user: User;
}

export class ArchiveApplicationDTO {
  @IsObject()
  user: User;
}

export class DeleteApplicationDTO {
  @IsObject()
  user: User;
}
