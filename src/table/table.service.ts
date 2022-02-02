import { Injectable } from '@nestjs/common';
import { Table } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Validator } from 'src/validation';
import { CreateTableDto } from './dto/createTable.dto';

@Injectable()
export class TableService {
  constructor(
    private prismaService: PrismaService,
    private validator: Validator,
  ) {}

  async create(
    createTableDto: CreateTableDto,
    userId: string,
  ): Promise<Table> {
    const { observation,menuItem } = createTableDto;

    await this.validator.findItemId(menuItem)

    const createdTable = await this.prismaService.table.create({
      data: {
        observation: observation,
        User: { connect: { id: userId } },
        Menu: { connect: { id: menuItem } },
      },
    });
    return createdTable;
  }

  async delete(tableId: string): Promise<Table> {

    const table = await this.validator.findTableId(tableId)
    
    await this.prismaService.table.delete({ where: { id: tableId } });

    return;
  }
}
