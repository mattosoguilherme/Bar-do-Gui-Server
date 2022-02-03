import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table, User } from '@prisma/client';
import { table } from 'console';
import { LoggedUser } from 'src/auth/loggedUser.decoretor';
import { CreateTableDto } from './dto/createTable.dto';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma mesa' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(
    @Body() createTableDto: CreateTableDto,
    @LoggedUser() user: User,
  ): Promise<Table> {
    return this.tableService.create(createTableDto, user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Deletar a mesa '})
  delete(@Param('id') tableId:string):Promise<Table>{
    return this.tableService.delete(tableId)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar todoas as mesas '})
  findMany(): Promise<Table[]>{
    return this.tableService.findMany()
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar mesa por ID '})
  findUnique(@Param('id') tableId:string){
    return this.tableService.findUnique(tableId)
  }

}
