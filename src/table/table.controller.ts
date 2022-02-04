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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table, User } from '@prisma/client';
import { table } from 'console';
import { LoggedUser } from 'src/auth/decorators/loggedUser.decoretor';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';
import { CreateTableDto } from './dto/createTable.dto';
import { UpdateUserTableDto } from './dto/updateUser.dto';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Criar uma mesa' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(),RolesGuard)
  create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return this.tableService.create(createTableDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(),RolesGuard)
  @ApiOperation({ summary: 'Deletar a mesa ' })
  delete(@Param('id') tableId: string): Promise<Table> {
    return this.tableService.delete(tableId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(),RolesGuard)
  @ApiOperation({ summary: 'Listar todoas as mesas ' })
  findMany(): Promise<Table[]> {
    return this.tableService.findMany();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar mesa por ID ' })
  findUnique(@Param('id') tableId: string) {
    return this.tableService.findUnique(tableId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard(),RolesGuard)
  @ApiOperation({ summary: 'Alterar usuários da mesa pelo ID' })
  @ApiBearerAuth()
  updateUserTable(
    @Param('id') tableId: string,
    @Body() updateUserTable: UpdateUserTableDto,
    @LoggedUser() userId: User,
  ) {
    return this.tableService.updateUserTable(tableId, updateUserTable, userId.id);
  }
}
