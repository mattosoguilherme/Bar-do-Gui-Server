import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { Validator } from 'src/validation';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MenuController],
  providers: [MenuService, PrismaService, Validator,RolesGuard],
})
export class MenuModule {}
