import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Awards } from '@prisma/client';

@ObjectType('Awards')
export class AwardsEntity implements Awards {
  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  nominations: number;

  @Field()
  text: string;
}
