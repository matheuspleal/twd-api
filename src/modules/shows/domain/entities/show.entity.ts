import { Entity } from '@/core/domain/entities/entity'
import { type UniqueEntityIdVO } from '@/core/domain/value-objects/unique-entity-id.vo'
import { type Optional } from '@/core/shared/types/optional.type'

export interface ShowProps {
  title: string
  description: string | null
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export class ShowEntity extends Entity<ShowProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ShowProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityIdVO,
  ): ShowEntity {
    const show = new ShowEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return show
  }
}
