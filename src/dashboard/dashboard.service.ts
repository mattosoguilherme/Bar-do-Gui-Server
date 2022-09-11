import { Injectable } from '@nestjs/common';
import { BdgService } from 'src/bardogui.service';
import { PrismaService } from 'src/prisma.service';
import { DateReportDto } from './dto/dateReport.dto';
import { MonthReportDto } from './dto/monthReport.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService, private bdgService: BdgService) {}

  async dayReport({ dateToSearch }: DateReportDto) {
    const daySearch = String(dateToSearch).slice(0, 10);
    const tables = (await this.prisma.table.findMany()).filter((t) => {
      const dateCreation = t.createAt.toISOString().slice(0, 10);

      if (dateCreation === daySearch) return t;
    });

    return this.bdgService.reportGenerator(tables);
  }

  async monthReport({ monthToSearch }: MonthReportDto) {
    const tables = (await this.prisma.table.findMany()).filter((t) => {
      const dateCreation = t.createAt.toISOString().slice(5, 7);

      console.log(dateCreation);

      if (dateCreation === monthToSearch) return t;
    });

    return this.bdgService.reportGenerator(tables);
  }

  async userReport(idUser: string) {
    await this.bdgService.findUserById(idUser);

    const userTables = await this.prisma.table.findMany({
      where: { userId: idUser },
    });

    console.log(userTables);

    return this.bdgService.reportGenerator(userTables);
  }
}
