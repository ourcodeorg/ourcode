import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './entities/user.entity';
import * as jwt from "jsonwebtoken";
import * as bcrpyt from "bcrypt";
import { PrismaService } from 'src/services/prisma/prisma.service';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}
  async create(userEntity: CreateUserDto) {
    const passwordHash = await bcrpyt.hash(userEntity.password,10);
    userEntity.password = passwordHash;
    try {
      const result = await this.prisma.user.create({
        data : {
          username: userEntity.username,
          email: userEntity.email,
          password: userEntity.password
        }
      })
    } catch (error) {
      throw new HttpException("User already exists",HttpStatus.BAD_REQUEST);
    }
    return "user created successfully";
  }

  async update(data: Partial<UpdateUserDto>, id: string){
    try {
      if(data?.password!==undefined){
        const passwordHash = await bcrpyt.hash(data.password,10);
        data.password = passwordHash;
      }
      const result = await this.prisma.user.update({
        where:{
          id,
        },
        data,
      })
    } catch (e) {
      throw new HttpException("User does not exists",HttpStatus.BAD_REQUEST);
    }
    return "User data updated";
  }

  async login(userEntity: LoginUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
