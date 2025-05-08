export class CreateUserDto {
    name: string;
    email: string;
    username?: string;
    password?: string;
    provider?: string;
    providerId?: string;
    avatar?: string;
    bio?: string;
  }
  