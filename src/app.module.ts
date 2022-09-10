import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [UserModule, TableModule, MenuModule, AuthModule, OrderModule, CategoryModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
