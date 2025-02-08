export interface CountMoviesRepositoryFilters {
  id?: string
  title?: string
  description?: string
  releaseDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface CountMoviesRepositoryInput {
  filter?: CountMoviesRepositoryFilters
}

export interface CountMoviesRepositoryOutput {
  count: number
}

export interface CountMoviesRepository {
  count({
    filter,
  }: CountMoviesRepositoryInput): Promise<CountMoviesRepositoryOutput>
}
