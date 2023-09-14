import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUser(username);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return this._stripPassword(user);
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    const loggedUser = await this.userService.getUser(user.username);
    return {
      user: this._stripPassword(loggedUser),
      access_token: this.jwtService.sign(payload),
    };
  }

  async signupUser(user: Prisma.UserCreateInput) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const createdUser = await this.userService.createUser(user);
    return this._stripPassword(createdUser);
  }

  private _stripPassword(user: User) {
    const { password, ...result } = user;
    return result;
  }
}
