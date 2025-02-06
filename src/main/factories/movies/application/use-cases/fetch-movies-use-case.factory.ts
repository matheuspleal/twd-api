import { makeCountMoviesPrismaRepository } from '@/main/factories/movies/infra/repositories/count-movies-prisma-repository.factory'
import { makeFindManyMoviesPrismaRepository } from '@/main/factories/movies/infra/repositories/find-many-movies-prisma-repository.factory'
import { FetchMoviesUseCase } from '@/modules/movies/application/use-cases/fetch-movies.use-case'

export function makeFetchMoviesUseCase() {
  return new FetchMoviesUseCase(
    makeCountMoviesPrismaRepository(),
    makeFindManyMoviesPrismaRepository(),
  )
}
