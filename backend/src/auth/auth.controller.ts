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
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserDTO,
  UserActionDTO,
} from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createDto: CreateUserDTO) {
    return await this.authService.create(createDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDTO) {
    return await this.authService.login(loginDto);
  }

  @Patch('users/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDTO) {
    return await this.authService.update(updateDto, id);
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
  async delete(@Param('id') id: string, @Body() userAction: UserActionDTO) {
    return await this.authService.remove(id, userAction.user);
  }
}
