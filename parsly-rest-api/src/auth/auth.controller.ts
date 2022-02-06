import { UserDto } from './../user/dto/user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/commons/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('/register')
  async register(@Body() data: UserDto) {
    return await this.authService.register(data);
  }

  @IsPublic()
  @Post('/login')
  async login(@Body() data: UserDto) {
    return await this.authService.login(data);
  }
}
