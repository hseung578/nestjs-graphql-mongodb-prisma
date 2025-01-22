import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ after, first }: PaginationInput) {
    const [movies, totalCount] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        take: first + 1,
        ...(after ? { cursor: { id: after }, skip: 1 } : {}),
        orderBy: {
          lastupdated: 'asc',
        },
      }),
      this.prisma.movie.count(),
    ]);

    const hasNextPage = movies.length > first;
    const results = hasNextPage ? movies.slice(0, -1) : movies;

    const edges = results.map((movie) => ({
      node: movie,
      cursor: movie.id,
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
