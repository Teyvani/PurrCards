import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import crypto from 'crypto';
import { EmailService } from '../email/email.service';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
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
    private configService: ConfigService,
    private emailService: EmailService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { username, password, email } = registerDto;

    const emailToken = crypto.randomBytes(32).toString();

    const user = await this.usersServise.create(
      username,
      password,
      email,
      emailToken,
    );

    this.emailService.sendEmailConfirmation(username, email, emailToken);
  }

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

    const { accessToken, refreshJwtToken } = await this.generateTokens(user);

    await this.saveNewRefreshToken(user.id, refreshJwtToken);

    return {
      access_token: accessToken,
      refresh_token: refreshJwtToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        emailValidated: user.emailValidated,
        role: user.role,
      },
    };
  }

  private async generateTokens(user: {
    id: number;
    username: string;
    email: string;
  }): Promise<{ accessToken: string; refreshJwtToken: string }> {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshJwtToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return { accessToken, refreshJwtToken };
  }

  private async removeExpiredJwtTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('userId = :id', { id: userId })
      .andWhere('expiresAt < :now', { now: new Date() })
      .execute();
  }

  async saveNewRefreshToken(userId: number, refreshJwtToken: string) {
    await this.removeExpiredJwtTokens(userId);

    const newToken = this.refreshTokenRepository.create({
      user: { id: userId },
      token: refreshJwtToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokenRepository.save(newToken);
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const storedToken = await this.refreshTokenRepository.findOne({
        where: { token: refreshToken },
        relations: ['user'],
      });

      if (!storedToken) {
        throw new Error('Refresh token not found in database');
      }

      if (storedToken.expiresAt < new Date()) {
        throw new Error('Refresh token expired');
      }

      const user = storedToken.user;
      const { accessToken, refreshJwtToken } = await this.generateTokens(user);

      await this.refreshTokenRepository.delete({ id: storedToken.id });
      await this.saveNewRefreshToken(user.id, refreshJwtToken);

      return {
        accessToken,
      };
    } catch (error) {
      throw new Error(`Invalid refresh token: ${error.message}`);
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token: refreshToken });
  }
}
