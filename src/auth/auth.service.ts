import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto/loginInput.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { Validator } from './../validation';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private validator: Validator,
  ) {}

  async login(loginInputDto: LoginInputDto): Promise<LoginResponseDto> {

    const { email, password } = loginInputDto;

    const userValid = await  this.validator.findUserEmail(email)

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
