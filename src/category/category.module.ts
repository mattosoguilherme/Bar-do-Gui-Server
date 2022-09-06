import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { BdgService } from 'src/bardogui.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,PrismaService,BdgService]
})
export class CategoryModule {}
