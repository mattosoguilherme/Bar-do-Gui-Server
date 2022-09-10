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
        User: { connect: { id: id } },
      },
      include: {
        User: { select: { name: true, id: true } },
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
      include: {
        order: {
          select: {
            Menu: {
              select: { name: true, imgUrl: true, id: true, price: true },
            },
          },
        },
        User: { select: { id: true, name: true, role: true } },
      },
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
      where: { close: false },
      include: {
        order: {
          include: {
            Menu: {
              select: { name: true, imgUrl: true, id: true, price: true },
            },
          },
        },
        User: { select: { id: true, role: true, name: true } },
      },
    });
  }

  async findUnique(id: string): Promise<Table> {
    return await this.bdgService.findTableById(id);
  }
}
