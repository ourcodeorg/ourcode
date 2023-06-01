import { User } from '@prisma/client';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsObject,
} from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @Length(3, 240)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description: string;

  @IsArray()
  skills: string[];

  @IsString()
  progress: string;

  @IsInt()
  peopleRequired: number;

  @IsString()
  experience: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsObject()
  user: User;

  @IsOptional()
  userId: String;
}
export class UpdatePostDto {
  @IsString()
  @Length(3, 240)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsString()
  @IsOptional()
  progress?: string;

  @IsInt()
  @IsOptional()
  peopleRequired?: number;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsObject()
  user?: User;

  @IsOptional()
  userId?: string;
}
