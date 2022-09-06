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

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const { observation } = createTableDto;

    const createdTable = await this.prismaService.table.create({
      data: { observation: observation },
      include: { order: { select: { Menu: true } }, user: true },
    });

    return createdTable;
  }

  async delete(tableId: string): Promise<Table> {
    await this.validator.findTableId(tableId);

    const tableDeleted = await this.prismaService.table.delete({
      where: { id: tableId },
      include: { order: { select: { Menu: true } } },
    });

    return tableDeleted;
  }

  async findMany(): Promise<Table[]> {
    const tableMany = await this.prismaService.table.findMany({
      select: {
        id: true,
        order: { select: { Menu: true } },
        user: true,
        observation: true,
        total: true,
        numberTable: true,
      },
    });

    return tableMany;
  }

  async findUnique(tableId: string): Promise<Table> {
    const tableFinded = await this.validator.findTableId(tableId);

    var soma: number = 0;

    for (let index = 0; index < tableFinded['order'].length; index++) {
      soma += tableFinded['order'][index].Menu.price;
    }

    const updateTable = await this.prismaService.table.update({
      where: { id: tableFinded.id },
      data:{ 
        observation: tableFinded.observation,
        total:soma
      },
      include:{order: { select: { Menu: true } }}
    });

    return updateTable;
  }
}
