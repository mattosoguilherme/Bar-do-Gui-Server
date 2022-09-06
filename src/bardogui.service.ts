import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Menu, Table, User, Order, Role } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from './user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './user/dto/updateUser.dto';
import { UpdateCredentialsDto } from './user/dto/updateCredentials.dto';

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

  //*
  //Funções assíncronas
  //*

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
  // *

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

  async fieldsUpdateValidator({
    name,
    email,
  }: UpdateUserDto): Promise<UpdateUserDto> {
    const fieldUpated = {
      name: name,
      email: email,
    };

    if (email) {
      await this.emailValid(email);
    }
    if (name) {
      fieldUpated['name'] = this.titleize(name);
    }

    return fieldUpated;
  }

  async credentialsValidator(
    {
      password_system,
      role,
      password,
      newPass,
      newPassConfirmation,
    }: UpdateCredentialsDto,
    id: string,
  ) {
    const credentialsUpdated = {
      newPass: '',
      role: role,
    };

    if (password) {
      await this.compare(password, id);

      credentialsUpdated['newpass'] = await this.encryptor(
        newPass,
        newPassConfirmation,
      );
    }

    if (role) {
      this.roleValidator(role, password_system);
    }

    return credentialsUpdated;
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

  async findTableId(id: string): Promise<Table> {
    const tableFinded = await this.prismaService.table.findUnique({
      where: { id: id },
      include: { order: { select: { Menu: true } } },
    });

    if (!tableFinded) {
      throw new NotFoundException('Mesa não encontrada.');
    }

    return tableFinded;
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
}
