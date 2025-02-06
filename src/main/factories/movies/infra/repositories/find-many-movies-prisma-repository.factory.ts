import { FindManyMoviesPrismaRepository } from '@/modules/movies/infra/repositories/find-many-movies-prisma.repository'

export function makeFindManyMoviesPrismaRepository() {
  return new FindManyMoviesPrismaRepository()
}
