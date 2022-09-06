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

    const createdMenu = await this.prismaService.menu.create({
      data: {
        name: name,
        imgUrl: imgUrl,
        price: price,
        description: description,
      },
    });

    return createdMenu;
  }

  async findMany() {
    const menu = await this.prismaService.menu.findMany();
    return menu;
  }

  async update(itemId: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const { name, imgUrl, category, description, price } = updateMenuDto;

    await this.bdgService.findItemId(itemId);

    const updatedItem = await this.prismaService.menu.update({
      where: { id: itemId },
      data: {
        name: name,
        imgUrl: imgUrl,
        description: description,
        price: price,
      },
    });

    return updatedItem;
  }

  async delete(itemId: string): Promise<Menu> {
    await this.bdgService.findItemId(itemId);
    const itemMany = await this.prismaService.order.findMany();

    itemMany.map((t) => {
      if(itemId === t.menuId) {
        throw new ConflictException(
          'Não é possivel apagar item do menu, pois, alguma mesa está aguardando o mesmo',
        );
      }
    });

    const deleteItemMenu = await this.prismaService.menu.delete({
      where: { id: itemId },
    });
    
    return deleteItemMenu;
  }

  async findUnique(itemId: string) {
    const itemFinded = await this.bdgService.findItemId(itemId);

    return itemFinded;
  }
}
