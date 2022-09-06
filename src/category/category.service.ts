import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private bdgService: BdgService,
    private prismaService: PrismaService,
  ) {}
  async create({ category }: CreateCategoryDto): Promise<Category> {
    await this.bdgService.categoryValid(category);

    return await this.prismaService.category.create({
      data: {
        category: category,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }

  async update(id: number, { category }: UpdateCategoryDto): Promise<Category> {
    await this.bdgService.findCategoryById(id);

    return await this.prismaService.category.update({
      where: { id: id },
      data: {
        category: category,
      },
    });
  }

  async remove(id: number):Promise<Category>{
    
    await this.bdgService.findCategoryById(id)

    return await this.prismaService.category.delete({
      where: { id: id },
    });
  }
}
