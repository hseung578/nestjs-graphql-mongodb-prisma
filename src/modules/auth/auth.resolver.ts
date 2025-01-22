import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { SignUpInput } from './dtos/sign-up.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UseGuards } from '@nestjs/common';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Payload } from './interfaces/payload.interface';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('input') signUpInput: SignUpInput) {
    return await this.authService.signup(signUpInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput, @Context() context: any) {
    return await this.authService.login(
      loginInput,
      context.req.res,
      context.req,
    );
  }

  @Mutation(() => LoginOutput)
  @UseGuards(RefreshAuthGuard)
  refresh(@CurrentUser() currentUser: Payload) {
    return this.authService.createToken({ sub: currentUser.sub });
  }
}
