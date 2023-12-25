import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in_response';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email, password): Promise<SignInResponseDto> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {  // (user?.password === password) // кейс без шифрования паролей
        const payload = {
          userId: user.id, 
          email: user.email,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
      };
      throw new Error(`Не корректные учетные данные.`);
    } catch (error) {
      const userMessage = 'Произошла ошибка при аутентификации: ';
      throw new HttpException(userMessage + error.message, HttpStatus.UNAUTHORIZED);
    }
  }

}