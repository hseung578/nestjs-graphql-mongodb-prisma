import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from '@prisma/client';
import { MovieEntity } from 'src/modules/movies/entities/movie.entity';

@ObjectType('Comment')
export class CommentEntity implements Comment {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  text: string;

  @Field(() => Date)
  date: Date;

  @Field(() => MovieEntity, { nullable: true })
  movie: MovieEntity;

  @Field(() => ID, { nullable: true })
  movieId: string;
}
