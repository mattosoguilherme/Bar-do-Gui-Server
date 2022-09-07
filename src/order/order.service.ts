import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';

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

    await this.prismaService.table.update({
      where: { id: tableId },
      data: {
        ...table,
        bill: table.bill + price,
      },
    });

    const createdOrder = await this.prismaService.order.create({
      data: {
        Table: { connect: { id: tableId } },
        Menu: { connect: { id: menuId } },
        observation:observation
      },
      include: { Table: true, Menu: true },
    });
    return createdOrder;
  }

  async findAll(): Promise<Order[]> {
    const orderFindMany = await this.prismaService.order.findMany({
      include: { Table: true, Menu: true },
    });

    return orderFindMany;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.bdgService.orderValid(id);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.bdgService.orderValid(id);

    const orderUpdated = await this.prismaService.order.update({
      where: { id: id },
      data: updateOrderDto,
      include: { Table: true, Menu: true },
    });

    return orderUpdated;
  }

  async remove(id: string): Promise<Order> {
    await this.bdgService.orderValid(id);

    const orderRemoved = await this.prismaService.order.delete({
      where: { id: id },
      include: { Table: true, Menu: true },
    });
    return orderRemoved;
  }
}
