import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import * as bcrypt from 'bcrypt'
import { BdgService } from 'src/bardogui.service';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private bdgService: BdgService,
  ) {}

  async login(loginInputDto: LoginInputDto): Promise<LoginResponseDto> {

    const { email, password } = loginInputDto;

    const userValid = await  this.bdgService.findUserByEmail(email)

    const hashValid = await bcrypt.compare(password,userValid.password)

    if(!hashValid){
        throw new UnauthorizedException("Crendencias inválidas");
    }

    delete userValid.password


    return {
        token: this.jwtService.sign({email}),
        user: userValid
    };
  }
}
