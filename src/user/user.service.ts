import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BdgService } from 'src/bardogui.service';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';
import { Role } from 'src/utils/roles.enum';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private bdgService: BdgService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { role, email, password, name } =
      await this.bdgService.fieldsValidator(createUserDto);

    const createdUser = await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        role: role,
      },
      include: { Table: true },
    });

    delete createdUser.password;

    return createdUser;
  }

  async findMany(): Promise<UserDto[]> {
    return await this.prismaService.user.findMany({
      select: {
        role: true,
        id: true,
        name: true,
        email: true,
        createAt: true,
        updateAt: true,
      },
    });
  }

  async findUnique(userId: string): Promise<User> {
    const userFinded = await this.bdgService.findUserById(userId);

    delete userFinded.password;

    return userFinded;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email } = await this.bdgService.fieldsUpdateValidator(
      updateUserDto,
    );

    await this.bdgService.findUserById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        email: email,
        name: name,
      },
      include: { Table: true },
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async updateCredentials(
    userId: string,
    updateCredentials: UpdateCredentialsDto,
  ): Promise<User> {
    const { id } = await this.bdgService.findUserById(userId);
    const { role, newPass } = await this.bdgService.credentialsValidator(
      updateCredentials,
      userId,
    );
    const credentialsUpdated = await this.prismaService.user.update({
      where: { id: id },
      data: {
        password: newPass,
        role: role,
      },
    });

    delete credentialsUpdated.password;
    return credentialsUpdated;
  }

  async delete(userId: string): Promise<User> {
    await this.bdgService.findUserById(userId);

    const deletedUser = await this.prismaService.user.delete({
      where: { id: userId },
      include: { Table: true },
    });

    delete deletedUser.password;

    return deletedUser;
  }
}
