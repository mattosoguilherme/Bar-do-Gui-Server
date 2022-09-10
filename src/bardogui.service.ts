import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Menu, Table, User, Order, Role, Category } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from './user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './user/dto/updateUser.dto';

@Injectable()
export class BdgService {
  constructor(private prismaService: PrismaService) {}

  //Funções síncronas

  roleValidator(role: Role, password_system: string) {
    if (role === Role.ADMIN) {
      if (password_system != process.env.PASSWORD_SISTEM) {
        throw new ConflictException('Senha do sistema está incorreta.');
      }
    }

    return role;
  }
  titleize(text: string) {
    var words = text.toLowerCase().split(' ');

    for (var i = 0; i < words.length; i++) {
      var w: string = words[i];
      words[i] = w[0].toUpperCase() + w.slice(1);
    }
    const n: string = words.join();
    return n.replace(/,/g, ' ');
  }

  reportGenerator(tables: Table[]) {
    const report = {
      winnings: 0,
      peoples: 0,
      adults: 0,
      kids: 0,
    };

    for (let index = 0; index < tables.length; index++) {
      report['winnings'] += tables[index].bill;
      report['peoples'] += tables[index].total_client;
      report['adults'] += tables[index].adult;
      report['kids'] += tables[index].kid;
    }

    return report;
  }

  //*
  //Funções assíncronas
  //*

  async addBill({ id, bill }: Table, cash: number) {
    await this.prismaService.table.update({
      where: { id: id },
      data: {
        bill: cash + bill,
      },
    });
  }

  async subBill({ id, bill }: Table, cash: number) {
    await this.prismaService.table.update({
      where: { id: id },
      data: {
        bill: cash - bill,
      },
    });
  }

  // Verificando se a senha é a mesma cadastrada no banco de dados
  async compare(pass: string, id: string) {
    const user = await this.findUserById(id);

    const hash_valided = await bcrypt.compare(pass, user.password);

    if (!hash_valided) {
      throw new ConflictException('Senha atual está incorreta.');
    }

    return;
  }

  async encryptor(pass: string, passConfirmation: string) {
    if (pass != passConfirmation) {
      throw new ConflictException('Senhas não conferem.');
    }
    return await bcrypt.hash(pass, 10);
  }

  // *
  // Buscando e validando componentes no banco de dados pelo seu atributo único
  //*
  async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findItemById(ItemId: string): Promise<Menu> {
    const itemMenu = await this.prismaService.menu.findUnique({
      where: { id: ItemId },
    });

    if (!itemMenu) {
      throw new NotFoundException('Item do menu não encontrado');
    }
    return itemMenu;
  }

  async findTableById(id: string): Promise<Table> {
    const tableFinded = await this.prismaService.table.findUnique({
      where: { id: id },
      include: {
        order: { select: { Menu: true } },
        user: { select: { name: true, id: true } },
      },
    });

    if (!tableFinded) {
      throw new NotFoundException('Mesa não encontrada.');
    }

    return tableFinded;
  }
  async findCategoryById(id: number): Promise<Category> {
    const categoryFinded = await this.prismaService.category.findUnique({
      where: { id: id },
    });

    if (!categoryFinded) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoryFinded;
  }

  async emailValid(email: string): Promise<User> {
    const emailValid = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (emailValid) {
      throw new ConflictException(
        ' Email já cadastrado! Tente outro por gentileza.',
      );
    }

    return emailValid;
  }

  async orderValid(id: string): Promise<Order> {
    const orderFinded = await this.prismaService.order.findUnique({
      where: { id: id },
      include: { Table: true, Menu: true },
    });

    if (!orderFinded.id) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return orderFinded;
  }

  // categoryValid verifica se a categoria já está cadastrada
  async categoryValid(category: string) {
    const s = await this.prismaService.category.findFirst({
      where: { category: category },
    });

    if (s) {
      throw new ConflictException('Categoria já cadastrada.');
    }
  }

  // *
  // Validando campos de acordo com as regras de negócio
  // *

  async fieldsValidator({
    name,
    password,
    passwordConfirmation,
    role,
    password_system,
    email,
  }: CreateUserDto): Promise<User> {
    this.roleValidator(role, password_system);

    await this.emailValid(email);

    return {
      name: this.titleize(name),
      password: await this.encryptor(password, passwordConfirmation),
      email: email,
      role: role,
      createAt: Date.prototype,
      updateAt: Date.prototype,
      tableId: '',
      id: '',
    };
  }

  async fieldsUpdateValidator(
    {
      name,
      email,
      actualPass,
      newPass,
      newPassConfirmation,
      password_system,
      role,
    }: UpdateUserDto,
    id: string,
  ): Promise<User> {
    const fieldUpdated = {
      name: '',
      password: '',
      email: '',
      role: role,
      createAt: Date.prototype,
      updateAt: Date.prototype,
      tableId: '',
      id: '',
    };

    if (actualPass) {
      await this.compare(actualPass, id);

      fieldUpdated['password'] = await this.encryptor(
        newPass,
        newPassConfirmation,
      );
    }

    if (role) {
      this.roleValidator(role, password_system);
    }

    if (email) {
      await this.emailValid(email);
    }
    if (name) {
      fieldUpdated['name'] = this.titleize(name);
    }

    return fieldUpdated;
  }

  //*
  //Função checkingIfOrdered verifica se o item está em algum pedido
  //*
  async checkingIfOrdered(id: string) {
    const itemMany = await this.prismaService.order.findMany();

    itemMany.map((t) => {
      if (id === t.menuId) {
        throw new ConflictException(
          'Não é possível apagar item do menu, pois, alguma mesa está aguardando o mesmo',
        );
      }
    });
  }
}
