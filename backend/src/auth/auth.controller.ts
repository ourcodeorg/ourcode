import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
} from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() userEntity: CreateUserDto) {
    return await this.authService.create(userEntity);
  }

  @Post('login')
  login(@Body() userEntity: LoginUserDto) {
    return this.authService.login(userEntity);
  }

  @Patch('users/:id')
  async update(
    @Param('id') id: string,
    @Body() userEntity: Partial<UpdateUserDto>,
  ) {
    return await this.authService.update(userEntity, id);
  }

  @Get('users')
  async findAll() {
    return await this.authService.findAll();
  }

  @Get('users/:id')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOne(id);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string) {
    return await this.authService.remove(id);
  }
}
