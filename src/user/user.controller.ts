import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/decorators/loggedUser.decoretor';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'cria um usuário' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários cadastrados' })
  findMany(): Promise<UserDto[]> {
    return this.userService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'listar um usuário pelo ID' })
  findUnique(@Param('id') userId: string): Promise<User> {
    return this.userService.findUnique(userId);
  }

  @Patch()
  @Roles(Role.USER, Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Atualializar o usuário autenticado' })
  update(
    @LoggedUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Deletar o usuário autenticado' })
  delete(@LoggedUser() user: User): Promise<User> {
    return this.userService.delete(user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Atualizar senha de qualquer usuário pelo Id. Acesso apenas ao ADMIN',
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  updateCredentials(
    @Param('id') user: string,
    @Body() updateCredentialsDto: UpdateCredentialsDto,
  ): Promise<User> {
    return this.userService.updateCredentials(user, updateCredentialsDto);
  }
}
