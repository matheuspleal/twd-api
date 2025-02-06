import { CountMoviesPrismaRepository } from '@/modules/movies/infra/repositories/count-movies-prisma.repository'

export function makeCountMoviesPrismaRepository() {
  return new CountMoviesPrismaRepository()
}
