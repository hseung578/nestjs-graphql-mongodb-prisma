import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { AwardsEntity } from './awards.entity';
import { TomatoesEntity } from './tomatoes.entity';
import { Movie } from '@prisma/client';

@ObjectType('Movie')
export class MovieEntity implements Movie {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  plot: string;

  @Field(() => [String])
  genres: string[];

  @Field(() => Int, { nullable: true })
  runtime: number;

  @Field({ nullable: true })
  rated: string;

  @Field(() => [String])
  cast: string[];

  @Field({ nullable: true })
  poster: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  fullplot: string;

  @Field(() => [String])
  countries: string[];

  @Field(() => [String])
  directors: string[];

  @Field(() => [String])
  languages: string[];

  @Field(() => [String])
  witers: string[];

  @Field()
  type: string;

  @Field(() => Int, { nullable: true })
  metacritic: number;

  @Field(() => Int, { nullable: true })
  numMflixComments: number;

  @Field(() => AwardsEntity)
  awards: AwardsEntity;

  @Field(() => TomatoesEntity, { nullable: true })
  tomatoes: TomatoesEntity;

  @Field(() => Date, { nullable: true })
  released: Date;

  @Field()
  lastupdated: string;

  @Field(() => [CommentEntity], { nullable: true })
  comments: CommentEntity[];
}
