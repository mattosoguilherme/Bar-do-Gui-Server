import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { LoggedUser } from './decorators/loggedUser.decoretor';
import { User } from '@prisma/client';
import { Role } from 'src/utils/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Fazer login' })
  login(@Body() loginInputDto: LoginInputDto): Promise<LoginResponseDto> {
    return this.authService.login(loginInputDto);
  }

  @Get()
  @Roles(Role.USER,Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Usuário logado com sucesso!' })
  @ApiBearerAuth()
  me(@LoggedUser() user: User) {
    return user;
  }
}
