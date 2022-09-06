import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Menu, User } from '@prisma/client';
import { LoggedUser } from 'src/auth/decorators/loggedUser.decoretor';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/roles.enum';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Criar um produto.' })
  @UseGuards(AuthGuard(),RolesGuard)
  @ApiBearerAuth()
  create(
    @Body() createMenuDto: CreateMenuDto,
    @LoggedUser() user: User,
  ): Promise<Menu> {
    return this.menuService.create(createMenuDto);
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

  @Patch(":id")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Atualizar produto do menu' })
  update(
    @Param('id') itemId: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(itemId, updateMenuDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Deletar produto do menu'})
  delete(@Param('id') itemId:string):Promise<Menu>{

    return this.menuService.delete(itemId)
  }
}
