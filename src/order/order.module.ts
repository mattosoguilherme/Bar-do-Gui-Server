import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Validator } from 'src/validation';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrderController],
  providers: [OrderService, Validator,PrismaService,RolesGuard]
})
export class OrderModule {}
