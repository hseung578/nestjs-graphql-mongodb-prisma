import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentsOutput } from './dtos/comments.dto';
import { PaginationInput } from 'src/common/dtos/pagination.dto';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => CommentsOutput, { name: 'commentsConnection' })
  async comments(@Args('input') paginationInput: PaginationInput) {
    return this.commentsService.findAll(paginationInput);
  }
}
