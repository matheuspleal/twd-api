import { BaseGenericPrismaRepository } from '@/core/infra/repositories/prisma/base-generic-prisma.repository'
import {
  type CountMoviesRepositoryInput,
  type CountMoviesRepository,
  type CountMoviesRepositoryOutput,
} from '@/modules/movies/application/repositories/count-movies.repository'

export class CountMoviesPrismaRepository
  extends BaseGenericPrismaRepository
  implements CountMoviesRepository
{
  constructor() {
    super()
  }

  async count({
    filter,
  }: CountMoviesRepositoryInput): Promise<CountMoviesRepositoryOutput> {
    const count = await this.prisma.movie.count({
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
    })
    return {
      count,
    }
  }
}
