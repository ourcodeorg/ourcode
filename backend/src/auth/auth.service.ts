import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './entities/user.entity';
import * as bcrpyt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(userEntity: CreateUserDto): Promise<Partial<User>> {
    const passwordHash = await bcrpyt.hash(userEntity.password, 10);
    userEntity.password = passwordHash;
    try {
      const user: User = await this.prisma.user.create({
        data: {
          username: userEntity.username,
          email: userEntity.email,
          password: userEntity.password,
        },
      });
      delete user.password;
      return user;
    } catch {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async login(userEntity: LoginUserDto) {
    try {
      const { username } = userEntity;
      const result = await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });
      const bcryptResult = await bcrpyt.compare(
        userEntity.password,
        result.password,
      );
      if (bcryptResult === false) {
        throw new HttpException(
          'Username or Password is wrong',
          HttpStatus.BAD_REQUEST,
        );
      }
      const token = jwt.sign(userEntity, process.env.JWT_SECRET);
      return {
        token,
      };
    } catch (e) {
      throw new HttpException(
        'Internal Server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(data: Partial<UpdateUserDto>, id: string): Promise<User> {
    try {
      if (data.password !== undefined) {
        const passwordHash = await bcrpyt.hash(data.password, 10);
        data.password = passwordHash;
      }
      const user: User = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
      delete user.password;
      return user;
    } catch {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
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

  async remove(id: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.delete({
        where: { id: id },
      });
      return user;
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
