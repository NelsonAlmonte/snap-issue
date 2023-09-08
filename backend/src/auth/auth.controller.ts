import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    const user = await this.authService.signupUser(createUserDto);
    if (!user) throw new BadRequestException('Hubo un error al registrarte');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('foo')
  foo(@Request() req) {
    return req.user;
  }
}
