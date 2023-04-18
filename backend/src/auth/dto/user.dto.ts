import { IsEmail, IsString } from 'class-validator';

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
}
