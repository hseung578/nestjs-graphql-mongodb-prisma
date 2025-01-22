import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from '../auth/dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { UserInput } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneById({ userId }: UserInput) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(signUpInput: SignUpInput) {
    signUpInput.password = bcrypt.hashSync(signUpInput.password, 10);
    return await this.prisma.user.create({ data: signUpInput });
  }
}
