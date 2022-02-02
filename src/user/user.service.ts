import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Validator } from 'src/validation';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validator: Validator,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, passwordConfirmation } = createUserDto;

    await this.validator.validatingEmail(email);

    if (password !== passwordConfirmation) {
      throw new ConflictException('Senhas digitas não estão iguais.');
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    delete createUserDto.password;

    return createdUser;
  }   

  async findMany(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
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

    await this.validator.validatingEmail(email);

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        email: email,
        name: name,
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async delete(userId: string): Promise<User> {
    await this.validator.findUserId(userId);

    const deletedUser = await this.prismaService.user.delete({
      where: { id: userId },
    });

    delete deletedUser.password;
    return deletedUser;
  }
}
