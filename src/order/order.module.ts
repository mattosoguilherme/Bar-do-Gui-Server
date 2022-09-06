import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from './../auth/guards/roles.guard';

import { PassportModule } from '@nestjs/passport';
import { BdgService } from 'src/bardogui.service';

@Module({
  imports:[PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrderController],
  providers: [OrderService, BdgService,PrismaService,RolesGuard]
})
export class OrderModule {}
