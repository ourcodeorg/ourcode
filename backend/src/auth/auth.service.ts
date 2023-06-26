import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  LoginResponse,
  LoginUserDTO,
  UpdateUserDTO,
  UserPayload,
} from './dto/user.dto';
import * as bcrpyt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from '@prisma/client';
import { HttpError } from 'src/error';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDTO): Promise<Partial<User>> {
    const passwordHash = await bcrpyt.hash(userDto.password, 10);
    userDto.password = passwordHash;
    try {
      const user: User = await this.prisma.user.create({
        data: {
          username: userDto.username,
          email: userDto.email,
          password: userDto.password,
        },
      });
      delete user.password;
      return user;
    } catch {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginUserDTO): Promise<LoginResponse> {
    try {
      const { username } = loginDto;
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });
      const correct = await bcrpyt.compare(loginDto.password, user.password);
      if (!correct) {
        throw Error();
      } else {
        const payload: UserPayload = {
          id: user.id,
        };
        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: '120d',
        });
        delete user.password;
        return {
          token,
          user,
        };
      }
    } catch (e) {
      throw new HttpException(
        'Username or Password is Incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async update(
    updateUserDto: Partial<UpdateUserDTO>,
    id: string,
  ): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) throw new HttpError('User not found', HttpStatus.NOT_FOUND);
      if (updateUserDto.user.id !== id) {
        throw new HttpError('Cannot update other users', HttpStatus.FORBIDDEN);
      }
      delete updateUserDto.user;
      if (updateUserDto.password !== undefined) {
        const passwordHash = await bcrpyt.hash(updateUserDto.password, 10);
        updateUserDto.password = passwordHash;
      }
      const updatedUser: User = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(): Promise<Partial<User[]>> {
    try {
      const users = this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      });
      return users as unknown as Partial<User[]>;
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return user;
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string, user: User): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        throw new HttpError('User not found', HttpStatus.NOT_FOUND);
      }
      if (existingUser.id !== user.id) {
        throw new HttpError('Cannot remove another user', HttpStatus.FORBIDDEN);
      }
      const d: User = await this.prisma.user.delete({
        where: { id: id },
      });
      return d;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async verify(token: string): Promise<User> {
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
      let user: User = await this.prisma.user.findFirstOrThrow({
        where: { id: payload.id },
      });
      return user;
    } catch {
      throw Error('Unauthorized');
    }
  }
}
