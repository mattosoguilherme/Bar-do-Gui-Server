import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { Validator } from 'src/validation';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TableController],
  providers: [TableService,PrismaService, Validator]
})
export class TableModule {}
