import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserInput } from './dtos/user.dto';
import { UseGuards } from '@nestjs/common';
import { AccessAuthGuard } from '../auth/guards/access-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Payload } from '../auth/interfaces/payload.interface';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  @UseGuards(AccessAuthGuard)
  async getUser(
    @CurrentUser() currentUser: Payload,
    @Args('input') userInput: UserInput,
  ) {
    return await this.usersService.findOneById(userInput);
  }
}
