import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';
import { DashboardService } from './dashboard.service';
import { DailyUserReportDto } from './dto/dailyUserReport.dto';
import { DateReportDto } from './dto/dateReport.dto';
import { MonthlyUserReportDto } from './dto/monthlyUserReport.dto';
import { MonthReportDto } from './dto/monthReport.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/dayReport')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary:
      'Gera relatório diário de total de lucros e fluxo  clientes no restaurante',
  })
  dayReport(@Body() dateToSearch: DateReportDto) {
    return this.dashboardService.dayReport(dateToSearch);
  }

  @Post('/monthReport')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary:
      'Gera relatório mensal de total de lucros e fluxo  clientes no restaurante',
  })
  monthReport(@Body() searchMonth: MonthReportDto) {
    return this.dashboardService.monthReport(searchMonth);
  }

  @Post('/monthlyUserReport')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary:
      'Gera relatório mensal do usuário de total de lucros e fluxo  clientes no restaurante',
  })
  monthlyUserReport(@Body() monthlyUserReport: MonthlyUserReportDto) {
    return this.dashboardService.monthlyUerReport(monthlyUserReport);
  }

  @Post('/dailyUserReport')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary:
      'Gera relatório diário do usuário de total de lucros e fluxo  clientes no restaurante',
  })
  dailyUserReport(@Body() dailyUserReport: DailyUserReportDto) {
    return this.dashboardService.dailyUerReport(dailyUserReport);
  }

  @Get(':idUser')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary: 'Gera relatório do usuário',
  })
  userReport(@Param('idUser') idUser: string) {
    return this.dashboardService.userReport(idUser);
  }
}
