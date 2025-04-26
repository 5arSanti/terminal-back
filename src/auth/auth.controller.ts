import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, TokenResponseDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginDTO): Promise<TokenResponseDTO> {
    try {
      const token = this.authService.login(body);

      return token;
    }
    catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
