import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Viewer } from '@prisma/client';

@ObjectType('Viewer')
export class ViewerEntity implements Viewer {
  @Field(() => Float, { nullable: true })
  rating: number;

  @Field(() => Int, { nullable: true })
  numReviews: number;

  @Field(() => Int, { nullable: true })
  meter: number;
}
