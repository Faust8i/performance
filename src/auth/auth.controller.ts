import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDto } from './dto/account.dto';
import { SignInResponseDto } from './dto/sign-in_response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(
    @Body() account: AccountDto
    ): Promise<SignInResponseDto> {
      return this.authService.signIn(account.email, account.password);
  }

}