import { makeFetchMoviesUseCase } from '@/main/factories/movies/application/use-cases/fetch-movies-use-case.factory'
import { FetchMoviesController } from '@/modules/movies/presentation/controllers/fetch-movies.controller'

export function makeFetchMoviesController() {
  return new FetchMoviesController(makeFetchMoviesUseCase())
}
