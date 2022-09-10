import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DateReportDto } from './dto/dateReport.dto';
import { MonthReportDto } from './dto/monthReport.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/dayReport')
  @ApiOperation({
    summary:
      'Puxa relatório diário de total de lucros e fluxo  clientes no restaurante',
  })
  dayReport(@Body() dateToSearch: DateReportDto) {
    return this.dashboardService.dayReport(dateToSearch);
  }

  @Post('/monthReport')
  @ApiOperation({
    summary:
      'Puxa relatório mensal de total de lucros e fluxo  clientes no restaurante',
  })
  monthReport(@Body() searchMonth: MonthReportDto) {
    return this.dashboardService.monthReport(searchMonth);
  }

  @Get(':idUser')
  @ApiOperation({
    summary: 'Puxa relatório do usuário',
  })
  userReport(@Param('idUser') idUser: string) {
    return this.dashboardService.userReport(idUser);
  }
}
