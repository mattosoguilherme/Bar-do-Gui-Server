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
        user:{ connect: { id: userId }}
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

  async delete(itemId:string) {
  
    const tableMany = await this.prismaService.table.findMany()

    tableMany.map( t => {
      if(itemId === t.menuId){
        throw new ConflictException( `Não é possivel deletar produto, pois, alguma mesa está aguardando o mesmo.`)
      }
    })

    const deleteItemMenu = await this.prismaService.menu.delete({
      where: { id: itemId },
    });
    return deleteItemMenu;
  }

 async findUnique(itemId:string) { 
  const itemFinded = await this.validator.findItemId(itemId)
  
  return itemFinded; 
 }
}
