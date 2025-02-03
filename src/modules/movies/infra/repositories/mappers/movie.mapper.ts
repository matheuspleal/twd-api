import { type Movie as MoviePrisma } from '@prisma/client'

import { UniqueEntityIdVO } from '@/core/domain/value-objects/unique-entity-id.vo'
import { Mapper } from '@/core/infra/repositories/mappers/mapper'
import { MovieEntity } from '@/modules/movies/domain/entities/movie.entity'
import {
  type Duration,
  DurationVO,
} from '@/modules/movies/domain/value-objects/duration-vo'

export class MovieMapper extends Mapper<MovieEntity, MoviePrisma> {
  static toDomain(moviePrisma: MoviePrisma): MovieEntity {
    return MovieEntity.create(
      {
        showId: moviePrisma.showId,
        releaseDate: moviePrisma.releaseDate,
        duration: new DurationVO(moviePrisma.duration as Duration),
        createdAt: moviePrisma.createdAt,
        updatedAt: moviePrisma.updatedAt,
      },
      new UniqueEntityIdVO(moviePrisma.id),
    )
  }

  static toCollectionDomain(moviesModel: MoviePrisma[]): MovieEntity[] {
    return moviesModel.map<MovieEntity>(MovieMapper.toDomain)
  }

  static toPersistence(movieEntity: MovieEntity): MoviePrisma {
    return {
      id: movieEntity.id.toString(),
      showId: movieEntity.showId,
      releaseDate: movieEntity.releaseDate,
      duration: movieEntity.duration.toValue(),
      createdAt: movieEntity.createdAt,
      updatedAt: movieEntity.updatedAt,
    }
  }

  static toCollectionPersistence(movieEntities: MovieEntity[]): MoviePrisma[] {
    return movieEntities.map<MoviePrisma>(MovieMapper.toPersistence)
  }
}
