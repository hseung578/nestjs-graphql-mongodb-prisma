import { Args, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { MoviesOutput } from './dtos/movies.dto';
import { PaginationInput } from 'src/common/dtos/pagination.dto';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => MoviesOutput, { name: 'moviesConnection' })
  async movies(@Args('input') paginationInput: PaginationInput) {
    return this.moviesService.findAll(paginationInput);
  }
}
