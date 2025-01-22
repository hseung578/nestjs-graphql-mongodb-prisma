import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Critic } from '@prisma/client';

@ObjectType('Critic')
export class CriticEntity implements Critic {
  @Field(() => Float, { nullable: true })
  rating: number;

  @Field(() => Int, { nullable: true })
  numReviews: number;

  @Field(() => Int, { nullable: true })
  meter: number;
}
