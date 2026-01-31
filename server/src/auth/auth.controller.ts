import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import strict from 'assert/strict';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);

    return {
      message: 'Registered successfully',
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, user } =
      await this.authService.login(loginDto);

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });
    return {
      message: 'Logged in successfully',
      access_token,
      user,
    };
  }
}
