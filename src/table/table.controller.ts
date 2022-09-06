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
import { LoggedUser } from 'src/auth/decorators/loggedUser.decoretor';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';
import { CreateTableDto } from './dto/createTable.dto';
import { UpdateTableDto } from './dto/updateTable.dto';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Iniciando atendimento a mesa' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(
    @Body() createTableDto: CreateTableDto,
    @LoggedUser() user: User,
  ): Promise<Table> {
    return this.tableService.create(createTableDto, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Deletar a mesa ' })
  delete(@Param('id') tableId: string): Promise<Table> {
    return this.tableService.delete(tableId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Encerramento de atendimento ' })
  close(@Param('id') id: string): Promise<Table> {
    return this.tableService.close(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Atualização de cadastro da mesa ' })
  update(@Param('id') id: string, table: UpdateTableDto): Promise<Table> {
    return this.tableService.update(table, id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Listagem de mesa em atendimento' })
  findMany(): Promise<Table[]> {
    return this.tableService.findMany();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listagem de mesa por ID ' })
  findUnique(@Param('id') tableId: string) {
    return this.tableService.findUnique(tableId);
  }
}
