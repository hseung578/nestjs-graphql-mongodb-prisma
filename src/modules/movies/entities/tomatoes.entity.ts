import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ViewerEntity } from './viewer.entity';
import { CriticEntity } from './critic.entity';
import { Tomatoes } from '@prisma/client';

@ObjectType('Tomatoes')
export class TomatoesEntity implements Tomatoes {
  @Field(() => ViewerEntity, { nullable: true })
  viewer: ViewerEntity;

  @Field({ nullable: true })
  boxOffice: string;

  @Field(() => Date, { nullable: true })
  dvd: Date;

  @Field({ nullable: true })
  website: string;

  @Field(() => CriticEntity, { nullable: true })
  critic: CriticEntity;

  @Field(() => Date)
  lastUpdated: Date;

  @Field({ nullable: true })
  consensus: string;

  @Field(() => Int, { nullable: true })
  rotten: number;

  @Field({ nullable: true })
  production: string;

  @Field(() => Int, { nullable: true })
  fresh: number;
}
