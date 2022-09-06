import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from './guards/roles.guard';
import { BdgService } from 'src/bardogui.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService,AuthService,BdgService,JwtStrategy, RolesGuard],
})
export class AuthModule {}
