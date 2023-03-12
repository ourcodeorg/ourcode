import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface UpdateUserDto {
  username: string;
  password: string;
}

export interface UserPayload extends JwtPayload {
  id: string;
}

export interface LoginResponse {
  user: Partial<User>;
  token: string;
}
