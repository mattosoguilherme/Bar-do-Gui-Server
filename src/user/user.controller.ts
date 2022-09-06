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

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Listagem de todos os usuários cadastrados. Acesso restrito ao ADMIN' })
  findMany(): Promise<UserDto[]> {
    return this.userService.findMany();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'listagem de usuário pelo ID. Acesso restrito ao ADMIN' })
  findUnique(@Param('id') userId: string): Promise<User> {
    return this.userService.findUnique(userId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary: 'Atualização de cadastro do usuário. Acesso restrito ao ADMIN',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary: 'Remoção do usuário autenticado. Acesso restrito ao ADMIN',
  })
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
