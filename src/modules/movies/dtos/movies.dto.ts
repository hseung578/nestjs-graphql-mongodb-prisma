import { InputType, ObjectType } from '@nestjs/graphql';
import { Paginated, PaginationInput } from 'src/common/dtos/pagination.dto';
import { MovieEntity } from '../entities/movie.entity';

@InputType()
export class MoviesInput extends PaginationInput {}

@ObjectType()
export class MoviesOutput extends Paginated(MovieEntity) {}
