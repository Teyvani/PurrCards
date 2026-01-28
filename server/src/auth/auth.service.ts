import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
  emailValidated: boolean;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    emailValidated: boolean;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersServise: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersServise.findByUsernameOrEmail(
      loginDto.usernameOrEmail,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Wrong password or user with such username/email does not exists',
      );
    }

    const isPasswordValid = await this.usersServise.checkPassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Wrong password or user with such username/email does not exists',
      );
    }

    if (!user.emailValidated) {
      throw new UnauthorizedException(
        'Email is not validated yet. Please check your email or post request to resend verification letter again.',
      );
    }

    return this.safeAuthResponse(user);
  }

  private async safeAuthResponse(user: any): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      emailValidated: user.emailValidated,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        emailValidated: user.emailValidated,
        role: user.role,
      },
    };
  }
}
