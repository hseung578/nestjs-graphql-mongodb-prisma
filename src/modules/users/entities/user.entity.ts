import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';

@ObjectType()
export class User extends BaseEntity {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
