import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BdgService } from 'src/bardogui.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TableController],
  providers: [TableService,PrismaService, BdgService,RolesGuard]
})
export class TableModule {}
