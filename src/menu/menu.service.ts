import { ConflictException, Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';

import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@Injectable()
export class MenuService {
  constructor(
    private prismaService: PrismaService,
    private bdgService: BdgService,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { description, category, name, imgUrl, price } = createMenuDto;

    await this.bdgService.findCategoryById(category);

    return await this.prismaService.menu.create({
      data: {
        name: name,
        imgUrl: imgUrl,
        price: price,
        description: description,
        Category: { connect: { id: category } },
      },
    });
  }

  async findMany(): Promise<Menu[]> {
    return await this.prismaService.menu.findMany();
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const { name, imgUrl, category, description, price } = updateMenuDto;
    await this.bdgService.findItemById(id);
    
    if (category) {
      await this.bdgService.findCategoryById(category);

      return await this.prismaService.menu.update({
        where: { id: id },
        data: {
          name: name,
          imgUrl: imgUrl,
          description: description,
          price: price,
          Category: { connect: { id: category } },
        },
      });
    }

    return await this.prismaService.menu.update({
      where: { id: id },
      data: {
        name: name,
        imgUrl: imgUrl,
        description: description,
        price: price,
      },
    });
  }

  async delete(id: string): Promise<Menu> {
    await this.bdgService.findItemById(id);
    await this.bdgService.checkingIfOrdered(id);

    return await this.prismaService.menu.delete({
      where: { id: id },
    });
  }

  async findUnique(id: string): Promise<Menu> {
    return await this.bdgService.findItemById(id);
  }
}
