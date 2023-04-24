import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  Length,
  IsInt,
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
}
