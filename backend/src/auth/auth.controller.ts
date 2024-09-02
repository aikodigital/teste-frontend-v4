import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    return this.authService.login(req.email, req.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
