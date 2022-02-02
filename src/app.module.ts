import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [UserModule, TableModule, MenuModule, AuthModule, TableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
