import { Type } from '@nestjs/common';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  after?: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  first: number;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType(`${classRef.name.replace('Entity', '')}Edge`, {
    isAbstract: true,
  })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => Int)
    totalCount: number;

    @Field(() => [EdgeType], { nullable: true })
    edges?: EdgeType[];

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
  }
  return PaginatedType;
}
