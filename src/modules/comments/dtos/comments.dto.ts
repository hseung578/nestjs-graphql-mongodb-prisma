import { InputType, ObjectType } from '@nestjs/graphql';
import { Paginated, PaginationInput } from 'src/common/dtos/pagination.dto';
import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CommentsInput extends PaginationInput {}

@ObjectType()
export class CommentsOutput extends Paginated(CommentEntity) {}
