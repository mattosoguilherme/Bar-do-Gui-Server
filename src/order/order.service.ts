import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Validator } from 'src/validation';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private validator: Validator,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = await this.prismaService.order.create({
      data: createOrderDto,
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
    const order = await this.validator.orderValid(id);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.validator.orderValid(id);

    const orderUpdated = await this.prismaService.order.update({
      where: { id: id },
      data: updateOrderDto,
      include: { Table: true, Menu: true },
    });

    return orderUpdated;
  }

  async remove(id: string): Promise<Order> {
    await this.validator.orderValid(id);

    const orderRemoved = await this.prismaService.order.delete({
      where: { id: id },
      include: { Table: true, Menu: true },
    });
    return orderRemoved;
  }
}
