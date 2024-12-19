import { type UserEntity } from '@/modules/users/domain/entities/user-entity'

export interface CreateUserRepositoryInput {
  user: UserEntity
}

export interface CreateUserRepositoryOutput {
  user: UserEntity
}

export interface CreateUserRepository {
  create({
    user,
  }: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput>
}
