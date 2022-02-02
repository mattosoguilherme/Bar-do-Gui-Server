import { ConflictException, Injectable } from '@nestjs/common';
import { Menu, Table, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Validator } from 'src/validation';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@Injectable()
export class MenuService {
  constructor(
    private prismaService: PrismaService,
    private validator: Validator,
  ) {}

  async create(createMenuDto: CreateMenuDto, userId: string): Promise<Menu> {
    const { stock, description, product, title, imgUrl, price } = createMenuDto;

    const createdMenu = await this.prismaService.menu.create({
      data: {
        stock: stock,
        title: title,
        imgUrl: imgUrl,
        price: price,
        product: product,
        description: description,
        table: { connect: { id: userId } },
      },
    });

    return createdMenu;
  }

  async findMany() {
    const menu = await this.prismaService.menu.findMany();
    return menu;
  }

  async update(itemId: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const { stock, title, imgUrl, product, description, price } = updateMenuDto;

    await this.validator.findItemId(itemId);

    const updatedItem = await this.prismaService.menu.update({
      where: { id: itemId },
      data: {
        stock: stock,
        title: title,
        imgUrl: imgUrl,
        product: product,
        description: description,
        price: price,
      },
    });

    return updatedItem;
  }

  async delete(user:User, table: Table) {
    const {numberTable } = table;
    const {menuId} = user 

    if (table.menuId === menuId) {
      throw new ConflictException(
        `Não é possivel deletar produto, pois, a mesa ${numberTable} está aguardando o mesmo.`,
      );
    }

    const deleteItemMenu = await this.prismaService.menu.delete({
      where: { id: menuId },
    });
    return deleteItemMenu;
  }

 async findUnique(itemId:string) { 
  const itemFinded = await this.validator.findItemId(itemId)
  
  return itemFinded; 
 }
}
