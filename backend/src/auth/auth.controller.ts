import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() userEntity: CreateUserDto) {
    return this.authService.create(userEntity);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() userEntity: UpdateUserDto) {
    return this.authService.update(userEntity, id);
  }
  
  @Get('users')
  getUser() {
    return this.authService.getUser();
  }
}
