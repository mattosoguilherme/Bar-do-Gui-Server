import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BdgService } from 'src/bardogui.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService,BdgService, PrismaService,RolesGuard],
})
export class UserModule {}
