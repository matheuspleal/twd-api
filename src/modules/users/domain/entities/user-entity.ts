import { Entity } from '@/core/domain/entities/entity'
import { type UniqueEntityIdVO } from '@/core/domain/value-objects/unique-entity-id-vo'
import { type Optional } from '@/core/shared/types/optional'
import { BirthdateVO } from '@/modules/users/domain/value-objects/birthdate-vo'
import { EmailVO } from '@/modules/users/domain/value-objects/email-vo'

export interface UserProps {
  fullName: string
  birthdate: BirthdateVO
  email: EmailVO
  password: string
  createdAt: Date
  updatedAt: Date
}

export type UserInput = Optional<
  Omit<UserProps, 'email' | 'birthdate'>,
  'createdAt' | 'updatedAt'
> & {
  birthdate: Date
  email: string
}

export class UserEntity extends Entity<UserProps> {
  get fullName() {
    return this.props.fullName
  }

  get birthdate() {
    return this.props.birthdate
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: UserInput, id?: UniqueEntityIdVO): UserEntity {
    const user = new UserEntity(
      {
        ...props,
        birthdate: new BirthdateVO({ value: props.birthdate }),
        email: new EmailVO({ value: props.email }),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
