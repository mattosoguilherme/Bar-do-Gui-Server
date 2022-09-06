import { Injectable } from '@nestjs/common';
import { Table, User } from '@prisma/client';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';
import { CreateTableDto } from './dto/createTable.dto';
import { UpdateTableDto } from './dto/updateTable.dto';

@Injectable()
export class TableService {
  constructor(
    private prismaService: PrismaService,
    private bdgService: BdgService,
  ) {}

  async create(
    { adult, kid, observation }: CreateTableDto,
    { id }: User,
  ): Promise<Table> {
    return await this.prismaService.table.create({
      data: {
        observation: observation,
        adult: adult,
        kid: kid,
        bill: 0,
        total_client: adult + kid,
        close: false,
        user: { connect: { id: id } },
      },
      include: {
        user: { select: { name: true, id: true } },
      },
    });
  }

  async update({ adult, observation, kid }: UpdateTableDto, id: string) {
    await this.bdgService.findTableById(id);

    return await this.prismaService.table.update({
      where: { id: id },
      data: {
        observation: observation,
        adult: adult,
        kid: kid,
        bill: 0,
        total_client: adult + kid,
      },
      include: { order: { select: { Menu: true } }, user: true },
    });
  }

  async close(id: string): Promise<Table> {
    await this.bdgService.findTableById(id);
    return await this.prismaService.table.update({
      where: { id: id },
      data: {
        close: true,
      },
    });
  }

  async delete(tableId: string): Promise<Table> {
    await this.bdgService.findTableById(tableId);

    return await this.prismaService.table.delete({
      where: { id: tableId },
      include: { order: { select: { Menu: true } } },
    });
  }

  async findMany(): Promise<Table[]> {
    return await this.prismaService.table.findMany({
      select: {
        id: true,
        order: { select: { Menu: true } },
        user: { select: { name: true, id: true } },
        observation: true,
        bill: true,
        numberTable: true,
        adult: true,
        kid: true,
        close: true,
        total_client: true,
        createAt: true,
        updateAt: true,
        _count: true,
      },
      where:{ close:false }
    });
  }

  async findUnique(id: string): Promise<Table> {
    return await this.bdgService.findTableById(id);
  }
}
