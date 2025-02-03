import { type Either, right } from '@/core/application/either'
import { type UnauthorizedError } from '@/core/application/use-cases/errors/unauthorized.error'
import { type UseCase } from '@/core/application/use-cases/use-case.contract'
import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'
import { type SortParams } from '@/core/shared/contracts/sort-params.contract'
import { type CountMoviesRepository } from '@/modules/movies/application/repositories/count-movies.repository'
import { type FindManyMoviesRepository } from '@/modules/movies/application/repositories/find-many-movies.repository'
import { type MovieEntity } from '@/modules/movies/domain/entities/movie.entity'

export interface FetchMoviesUseCaseFilters {
  id?: string
  title?: string
  description?: string
  releaseDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface FetchMoviesUseCaseSort {
  id?: string
  title?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FetchMoviesUseCaseInput {
  pagination: PaginationParams
  filters?: FetchMoviesUseCaseFilters
  sort?: SortParams<FetchMoviesUseCaseSort>
}

export type FetchMoviesUseCaseOutput = Either<
  UnauthorizedError,
  {
    count: number
    movies: MovieEntity[]
  }
>

export class FetchMoviesUseCase
  implements UseCase<FetchMoviesUseCaseInput, FetchMoviesUseCaseOutput>
{
  constructor(
    private readonly countMoviesRepository: CountMoviesRepository,
    private readonly findManyMoviesRepository: FindManyMoviesRepository,
  ) {}

  async execute({
    pagination,
    filters,
    sort,
  }: FetchMoviesUseCaseInput): Promise<FetchMoviesUseCaseOutput> {
    const [countMoviesResult, findManyMoviesResult] = await Promise.all([
      this.countMoviesRepository.count({
        filters,
      }),
      this.findManyMoviesRepository.findMany({
        pagination,
        filters,
        sort,
      }),
    ])
    return right({
      count: countMoviesResult.count,
      movies: findManyMoviesResult.movies,
    })
  }
}
