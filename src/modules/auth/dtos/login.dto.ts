import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { SignUpInput } from './sign-up.dto';

@InputType()
export class LoginInput extends PickType(SignUpInput, ['email', 'password']) {}

@ObjectType()
export class LoginOutput {
  @Field()
  token?: string;
}
