import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Menu, Table, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class Validator {
  constructor(private prismaService: PrismaService) {}

  async findUserEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    console.log(user);
    return user;
  }

  async findItemId(ItemId: string): Promise<Menu> {
    const itemMenu = await this.prismaService.menu.findUnique({
      where: { id: ItemId },
    });

    if (!itemMenu) {
      throw new NotFoundException('Item do menu não encontrado');
    }
    return itemMenu;
  }

  async validatingEmail(email: string): Promise<User> {
    const emailValid = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (emailValid) {
      throw new ConflictException(
        ' Email já cadastrado! Tente outro por gentileza.',
      );
    }

    console.log(emailValid);
    return emailValid;
  }

  async findUserId(id: string): Promise<User> {
    const idUser = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!idUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    console.log(idUser);
    return idUser;
  }

  async findTableId(id: string): Promise<Table> {
    const tableFinded = await this.prismaService.table.findUnique({
      where: { id: id },
    });

    if (!tableFinded) {
      throw new NotFoundException('Mesa não encontrada.');
    }

    return tableFinded;
  }
}
