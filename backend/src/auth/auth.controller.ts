import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return request.user;
  }

  @Post('signup')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    const user = await this.authService.signupUser(createUserDto);
    if (!user)
      throw new BadRequestException(
        'Hubo un error al reportar esta incidencia',
      );
    return user;
  }
}
