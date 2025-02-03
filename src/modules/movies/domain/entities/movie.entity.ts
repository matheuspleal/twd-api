import { Entity } from '@/core/domain/entities/entity'
import { type UniqueEntityIdVO } from '@/core/domain/value-objects/unique-entity-id.vo'
import { type Optional } from '@/core/shared/types/optional.type'
import { type DurationVO } from '@/modules/movies/domain/value-objects/duration-vo'
import { type ShowEntity } from '@/modules/shows/domain/entities/show.entity'

export interface MovieProps {
  showId: string
  show?: ShowEntity
  releaseDate: Date
  duration: DurationVO
  createdAt: Date
  updatedAt: Date
}

export type MovieInput = Optional<MovieProps, 'createdAt' | 'updatedAt'>

export class MovieEntity extends Entity<MovieProps> {
  get showId() {
    return this.props.showId
  }

  get show() {
    return this.props.show
  }

  get releaseDate() {
    return this.props.releaseDate
  }

  get duration() {
    return this.props.duration
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: MovieInput, id?: UniqueEntityIdVO): MovieEntity {
    const movie = new MovieEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return movie
  }
}
