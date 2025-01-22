import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dtos/sign-up.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import * as bcrpypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    return await this.userService.create(signUpInput);
  }

  async login(
    { email, password }: LoginInput,
    res: Response,
    req: Request,
  ): Promise<LoginOutput> {
    const user = await this.userService.findOneByEmail(email);

    const isAuth = await bcrpypt.compare(password, user.password);
    if (!isAuth) throw new UnauthorizedException();

    const payload = { sub: user.id };
    this.setToken(payload, res, req);
    return this.createToken(payload);
  }

  createToken(payload: { sub: string }) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_KEY'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
    });
    return {
      token,
    };
  }

  setToken(payload: { sub: string }, res: Response, req: Request) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.cookie('refreshToken', token, {
      path: '/',
      // domain: '*',
      // httpOnly: true,
      // sameSite: 'none',
      // secure: true,
    });
  }
}
