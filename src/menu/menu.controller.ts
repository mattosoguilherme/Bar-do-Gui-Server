import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Menu, Table, User } from '@prisma/client';
import { LoggedUser } from 'src/auth/loggedUser.decoretor';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um produto.' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  create(
    @Body() createMenuDto: CreateMenuDto,
    @LoggedUser() user: User,
  ): Promise<Menu> {
    return this.menuService.create(createMenuDto, user.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar todos os produtos do menu.' })
  findMany(): Promise<Menu[]> {
    return this.menuService.findMany();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Lista item do menu pelos seu ID'})
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findUnique(@Param('id') itemId:string): Promise<Menu>{
    return this.menuService.findUnique(itemId)
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Atualizar produto do menu' })
  update(
    @LoggedUser() item: Menu,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(item.id, updateMenuDto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Deletar produto do menu'})
  delete(@LoggedUser() user:User, table: Table){

    return this.menuService.delete(user, table)
  }
}
