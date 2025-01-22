import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ after, first }: PaginationInput) {
    const [comments, totalCount] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        take: first + 1,
        ...(after ? { cursor: { id: after }, skip: 1 } : {}),
        orderBy: {
          date: 'asc',
        },
      }),
      this.prisma.comment.count(),
    ]);

    const hasNextPage = comments.length > first;
    const results = hasNextPage ? comments.slice(0, -1) : comments;

    const edges = results.map((comment) => ({
      node: comment,
      cursor: comment.id,
    }));

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      totalCount,
      edges,
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    };
  }
}
