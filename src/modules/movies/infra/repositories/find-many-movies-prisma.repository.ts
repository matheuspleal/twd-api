import { BaseGenericPrismaRepository } from '@/core/infra/repositories/prisma/base-generic-prisma.repository'
import { BuildPrismaSortParam } from '@/core/infra/repositories/prisma/decorators/build-prisma-order-by-param.decorator'
import { BuildPrismaTakeLimitParams } from '@/core/infra/repositories/prisma/decorators/build-prisma-take-limit-params.decorator'
import { PrismaTypes } from '@/core/infra/repositories/prisma/types/prisma.types'
import {
  type FindManyMoviesRepositoryInput,
  type FindManyMoviesRepository,
  type FindManyMoviesRepositoryOutput,
} from '@/modules/movies/application/repositories/find-many-movies.repository'
import { MovieMapper } from '@/modules/movies/infra/repositories/mappers/movie.mapper'

export class FindManyMoviesPrismaRepository
  extends BaseGenericPrismaRepository
  implements FindManyMoviesRepository
{
  constructor() {
    super()
  }

  @BuildPrismaTakeLimitParams()
  @BuildPrismaSortParam()
  async findMany({
    pagination,
    filter,
    orderBy,
  }: FindManyMoviesRepositoryInput &
    PrismaTypes): Promise<FindManyMoviesRepositoryOutput> {
    const { take, skip } = pagination
    const foundMovies = await this.prisma.movie.findMany({
      include: {
        show: {
          select: {
            title: true,
            description: true,
            imageUrl: true,
          },
        },
      },
      where: {
        id: filter?.id,
        releaseDate: filter?.releaseDate,
        createdAt: filter?.createdAt,
        updatedAt: filter?.updatedAt,
        show: {
          title: filter?.title,
          description: filter?.description,
        },
      },
      orderBy,
      skip,
      take,
    })
    return {
      movies: MovieMapper.toCollectionDomain(foundMovies),
    }
  }
}
