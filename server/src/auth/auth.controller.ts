import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import strict from 'assert/strict';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    await this.authService.confirmEmail(token);

    return {
      message: 'Email confirmed successfully',
    };
  }

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
      secure: this.configService.get('NODE_ENV') === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });
    return {
      message: 'Logged in successfully',
      access_token,
      user,
    };
  }

  @Get('profile')
  async getProfile() {}
}
