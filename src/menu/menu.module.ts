import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BdgService } from 'src/bardogui.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MenuController],
  providers: [MenuService, PrismaService, BdgService,RolesGuard],
})
export class MenuModule {}
