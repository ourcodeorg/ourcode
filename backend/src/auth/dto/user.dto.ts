import { IsEmail, IsObject, IsString } from 'class-validator';
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  id: string;
}

export interface LoginResponse {
  user: Partial<User>;
  token: string;
}

export class UserActionDTO {
  @IsObject()
  user: User;
}

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsObject()
  user: User;
}
