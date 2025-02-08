import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'
import { type SortParams } from '@/core/shared/contracts/sort-params.contract'
import { type MovieEntity } from '@/modules/movies/domain/entities/movie.entity'

export interface FindManyMoviesRepositoryFilter {
  id?: string
  title?: string
  description?: string
  releaseDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface FindManyMoviesRepositorySort {
  id?: string
  title?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FindManyMoviesRepositoryInput {
  pagination: PaginationParams
  filter?: FindManyMoviesRepositoryFilter
  sort?: SortParams<FindManyMoviesRepositorySort>
}

export interface FindManyMoviesRepositoryOutput {
  movies: MovieEntity[]
}

export interface FindManyMoviesRepository {
  findMany({
    pagination,
    filter,
    sort,
  }: FindManyMoviesRepositoryInput): Promise<FindManyMoviesRepositoryOutput>
}
