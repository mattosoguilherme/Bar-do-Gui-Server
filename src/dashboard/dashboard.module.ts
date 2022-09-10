import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from 'src/prisma.service';
import { BdgService } from 'src/bardogui.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService,PrismaService,BdgService]
})
export class DashboardModule {}
