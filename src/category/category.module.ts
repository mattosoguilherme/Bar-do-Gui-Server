import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { BdgService } from 'src/bardogui.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,PrismaService,BdgService,RolesGuard]
})
export class CategoryModule {}
