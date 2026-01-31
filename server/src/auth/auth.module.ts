import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { RefreshToken } from './entities/refresh-token.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
