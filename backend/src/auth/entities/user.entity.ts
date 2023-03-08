export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface UpdateUserDto{
  username: string;
  password: string;
}
