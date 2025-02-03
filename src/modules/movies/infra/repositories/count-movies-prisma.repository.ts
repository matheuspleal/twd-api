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
    filters,
  }: CountMoviesRepositoryInput): Promise<CountMoviesRepositoryOutput> {
    const count = await this.prisma.movie.count({
      where: {
        id: filters?.id,
        title: filters?.title,
        description: filters?.description,
        releaseDate: filters?.releaseDate,
        createdAt: filters?.createdAt,
        updatedAt: filters?.updatedAt,
      },
    })
    return {
      count,
    }
  }
}
