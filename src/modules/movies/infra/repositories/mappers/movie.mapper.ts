import {
  type Movie as MoviePrisma,
  type Show as ShowPrisma,
} from '@prisma/client'

import { UniqueEntityIdVO } from '@/core/domain/value-objects/unique-entity-id.vo'
import { Mapper } from '@/core/infra/repositories/mappers/mapper'
import { MovieEntity } from '@/modules/movies/domain/entities/movie.entity'
import {
  type Duration,
  DurationVO,
} from '@/modules/movies/domain/value-objects/duration-vo'
import { ShowEntity } from '@/modules/shows/domain/entities/show.entity'

export type MoviePersistence = {
  show: Pick<ShowPrisma, 'title' | 'description' | 'imageUrl'>
} & MoviePrisma

export class MovieMapper extends Mapper<MovieEntity, MoviePersistence> {
  static toDomain(moviePersistence: MoviePersistence): MovieEntity {
    return MovieEntity.create(
      {
        showId: moviePersistence.showId,
        show: ShowEntity.create(
          {
            title: moviePersistence.show.title,
            description: moviePersistence.show.description,
            imageUrl: moviePersistence.show.imageUrl,
          },
          new UniqueEntityIdVO(moviePersistence.showId),
        ),
        releaseDate: moviePersistence.releaseDate,
        duration: new DurationVO(moviePersistence.duration as Duration),
        createdAt: moviePersistence.createdAt,
        updatedAt: moviePersistence.updatedAt,
      },
      new UniqueEntityIdVO(moviePersistence.id),
    )
  }

  static toCollectionDomain(moviesModel: MoviePersistence[]): MovieEntity[] {
    return moviesModel.map<MovieEntity>(MovieMapper.toDomain)
  }
}
