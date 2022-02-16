import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Validator } from 'src/validation';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';
import { Role } from 'src/utils/roles.enum';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validator: Validator,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password_sistem ,role ,email, password, passwordConfirmation } = createUserDto;

    if (role === Role.ADMIN) {
      if(password_sistem != process.env.PASSWORD_SISTEM){
        throw new ConflictException('Senha do sistema está incorreta.')
      }
    }
    await this.validator.validatingEmail(email);

    if (password !== passwordConfirmation) {
      throw new ConflictException('Senhas digitas não estão iguais.');
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(password, 10);

    delete createUserDto.password_sistem;

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      include: { Table: true },
    });

    delete createUserDto.password;

    return createdUser;
  }

  async findMany(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        role: true,
        id: true,
        name: true,
        email: true,
        createAt: true,
        updateAt: true,
      },
    });
    return users;
  }

  async findUnique(userId: string): Promise<User> {
    const userFinded = await this.validator.findUserId(userId);

    delete userFinded.password;
    return userFinded;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email } = updateUserDto;

    await this.validator.findUserId(userId);

    if (email) {
      const emailExisting = await this.prismaService.user.findUnique({
        where: { email: email },
      });
      if (emailExisting) {
        throw new ConflictException('email já cadastrado');
      }
    }

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
    const user = await this.validator.findUserId(userId);
    const {
      password_sistem,
      role,
      password,
      newPassword,
      newPasswordConfirmation,
    } = updateCredentials;

    if (role === Role.ADMIN) {
      if(password_sistem != process.env.PASSWORD_SISTEM){
        throw new ConflictException('Senha do sistema está incorreta.')
      }
    }

    if (newPassword != newPasswordConfirmation) {
      throw new ConflictException('Senhas não conferem.');
    }

    const hashValid = await bcrypt.compare(password,user.password)

    if (!hashValid) {
      throw new ConflictException('Senha incorreta, digite novamente.');
    }

    const credentialsUpdated = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        role: role,
      },
    });

    delete credentialsUpdated.password;
    return credentialsUpdated;
  }

  async delete(userId: string): Promise<User> {
    await this.validator.findUserId(userId);

    const deletedUser = await this.prismaService.user.delete({
      where: { id: userId },
      include: { Table: true },
    });

    delete deletedUser.password;
    return deletedUser;
  }
}
