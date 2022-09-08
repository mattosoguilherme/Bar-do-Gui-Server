import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';
import { threadId } from 'worker_threads';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private bdgService: BdgService,
  ) {}

  async create({
    menuId,
    tableId,
    observation,
  }: CreateOrderDto): Promise<Order> {
    const table = await this.bdgService.findTableById(tableId);
    const { price } = await this.bdgService.findItemById(menuId);

    await this.bdgService.addBill(table, price);

    return await this.prismaService.order.create({
      data: {
        Table: { connect: { id: tableId } },
        Menu: { connect: { id: menuId } },
        observation: observation,
      },
      include: { Table: true, Menu: true },
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.prismaService.order.findMany({
      include: { Table: true, Menu: true },
    });
  }

  async findOne(id: string): Promise<Order> {
    return await this.bdgService.orderValid(id);
  }

  async update(
    id: string,
    { menuId, observation, tableId }: UpdateOrderDto,
  ): Promise<Order> {
    const orderFinded = await this.bdgService.orderValid(id);

    if (menuId && tableId) {
      const newTable = await this.bdgService.findTableById(tableId);
      const oldTable = await this.bdgService.findTableById(orderFinded.tableId);
      const item = await this.bdgService.findItemById(orderFinded.menuId);
      const { price } = await this.bdgService.findItemById(menuId);

      await this.bdgService.subBill(oldTable, item.price);
      await this.bdgService.addBill(newTable, price);

      return await this.prismaService.order.update({
        where: { id: id },
        data: {
          Menu: { connect: { id: menuId } },
          Table: { connect: { id: tableId } },
          observation: observation,
        },
        include: {
          Table: { select: { close: true, numberTable: true } },
          Menu: {
            select: {
              name: true,
              price: true,
              imgUrl: true,
              description: true,
            },
          },
        },
      });
    }

    if (menuId) {
      const item = await this.bdgService.findItemById(orderFinded.menuId);
      const table = await this.bdgService.findTableById(tableId);
      const { price } = await this.bdgService.findItemById(menuId);
      await this.bdgService.subBill(table, item.price);

      await this.bdgService.addBill(table, price);

      return await this.prismaService.order.update({
        where: { id: id },
        data: {
          Menu: { connect: { id: menuId } },
          observation: observation,
        },
        include: {
          Table: { select: { close: true, numberTable: true } },
          Menu: {
            select: {
              name: true,
              price: true,
              imgUrl: true,
              description: true,
            },
          },
        },
      });
    }

    if (tableId) {
      const newTable = await this.bdgService.findTableById(tableId);
      const oldTable = await this.bdgService.findTableById(orderFinded.tableId);
      const item = await this.bdgService.findItemById(orderFinded.menuId);

      await this.bdgService.subBill(oldTable, item.price);
      await this.bdgService.addBill(newTable, item.price);

      return await this.prismaService.order.update({
        where: { id: id },
        data: {
          Table: { connect: { id: tableId } },
          observation: observation,
        },
        include: {
          Table: { select: { close: true, numberTable: true } },
          Menu: {
            select: {
              name: true,
              price: true,
              imgUrl: true,
              description: true,
            },
          },
        },
      });
    }

    return await this.prismaService.order.update({
      where: { id: id },
      data: {
        observation: observation,
      },
      include: {
        Table: { select: { close: true, numberTable: true } },
        Menu: {
          select: {
            name: true,
            price: true,
            imgUrl: true,
            description: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<Order> {
    const orderFinded = await this.bdgService.orderValid(id);
    const table = await this.bdgService.findTableById(orderFinded.tableId);
    const item = await this.bdgService.findItemById(orderFinded.menuId);

    await this.bdgService.subBill(table, item.price);

    return await this.prismaService.order.delete({
      where: { id: id },
      include: { Table: true, Menu: true },
    });
  }
}
