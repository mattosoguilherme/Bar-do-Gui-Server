import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table, User } from '@prisma/client';
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
}
