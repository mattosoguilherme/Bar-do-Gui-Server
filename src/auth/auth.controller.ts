import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { LoggedUser } from './loggedUser.decoretor';
import { User } from '@prisma/client';

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
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Usuário logado com sucesso!' })
  @ApiBearerAuth()
  me(@LoggedUser() user: User) {
    return user;
  }
}
