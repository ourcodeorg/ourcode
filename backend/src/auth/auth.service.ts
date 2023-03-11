import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  UpdateUserDto,
  UserPayload,
} from './entities/user.entity';
import * as bcrpyt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<Partial<User>> {
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

  async login(loginDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const { username } = loginDto;
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });
      const correct = await bcrpyt.compare(loginDto.password, user.password);
      if (!correct) throw Error();
      const payload: UserPayload = {
        id: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      delete user.password;
      return {
        token,
        user,
      };
    } catch (e) {
      throw new HttpException(
        'Username or Password is Incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async update(updateUserDto: Partial<UpdateUserDto>, id: string): Promise<User> {
    try {
      if (updateUserDto.password !== undefined) {
        const passwordHash = await bcrpyt.hash(updateUserDto.password, 10);
        updateUserDto.password = passwordHash;
      }
      const user: User = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
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
