import { Injectable } from '@nestjs/common';
import { createUserDto, loginUserDto } from './entities/user.entity';

@Injectable()
export class AuthService {
  create(userEntity: createUserDto) {
    return 'This action adds a new auth';
  }

  login(userEntity: loginUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
