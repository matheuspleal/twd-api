import { BasePrismaRepository } from '@/core/infra/repositories/base-prisma-repository'
import {
  type CreateUserRepositoryInput,
  type CreateUserRepositoryOutput,
  type CreateUserRepository,
} from '@/modules/users/application/repositories/create-user-repository'
import { UserMapper } from '@/modules/users/application/use-cases/mappers/user-mapper'

export class CreateUserPrismaRepository
  extends BasePrismaRepository
  implements CreateUserRepository
{
  constructor() {
    super()
  }

  async create({
    user,
  }: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...UserMapper.toPersistence(user),
      },
    })
    return {
      user: UserMapper.toDomain(createdUser),
    }
  }
}
