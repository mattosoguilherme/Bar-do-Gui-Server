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

  percent(all: number, part: number) {
    return Math.round((part * 100) / all);
  }

  //Função roleValidator confere se a senha do sistema está correta
  roleValidator(role: Role, password_system: string) {
    if (role === Role.ADMIN) {
      if (password_system != process.env.PASSWORD_SISTEM) {
        throw new ConflictException('Senha do sistema está incorreta.');
      }
    }

    return role;
  }

  //Função titleize deixa a primeira letra maiúscula de cada palavra numa string
  titleize(text: string) {
    var words = text.toLowerCase().split(' ');

    for (var i = 0; i < words.length; i++) {
      var w: string = words[i];
      words[i] = w[0].toUpperCase() + w.slice(1);
    }
    const n: string = words.join();
    return n.replace(/,/g, ' ');
  }

  // Função reportGenerator gera um relatório de total de lucros, pessoas atendidas (adulto e crianças) e também o total de mesas.
  reportGenerator(tables: Table[]) {
    const report = {
      total_profits: 0,
      total_number_of_customers_served: 0,
      adults: 0,
      kids: 0,
      tables: tables.length,
    };

    for (let index = 0; index < tables.length; index++) {
      report['total_profits'] += tables[index].bill;
      report['total_number_of_customers_served'] += tables[index].total_client;
      report['adults'] += tables[index].adult;
      report['kids'] += tables[index].kid;
    }

    report['total_profits'] = Math.round(report.total_profits);
    report['percentage_of_adults'] = this.percent(
      report.total_number_of_customers_served,
      report.adults,
    );
    report['percentage_of_kids'] = this.percent(
      report.total_number_of_customers_served,
      report.kids,
    );
    return report;
  }

  //*
  //Funções assíncronas
  //*

  //Função addBill adiciona valor a comanda e função subBill subtrai valores da comanda
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

  // Função compare verifica se a senha é a mesma que está cadastrada no banco de dados
  async compare(pass: string, id: string) {
    const user = await this.findUserById(id);

    const hash_valided = await bcrypt.compare(pass, user.password);

    if (!hash_valided) {
      throw new ConflictException('Senha atual está incorreta.');
    }

    return;
  }

  //Função encryptor criptógrafa a senha(string) cadastrada pelo usuário
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
        User: { select: { id: true, name: true, role: true } },
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

    if (!orderFinded) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return orderFinded;
  }

  async categoryValid(category: string) {
    const c = await this.prismaService.category.findFirst({
      where: { category: category },
    });

    if (c) {
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
