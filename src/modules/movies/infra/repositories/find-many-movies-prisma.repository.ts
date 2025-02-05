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
    filters,
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
        id: filters?.id,
        releaseDate: filters?.releaseDate,
        createdAt: filters?.createdAt,
        updatedAt: filters?.updatedAt,
        show: {
          title: filters?.title,
          description: filters?.description,
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
