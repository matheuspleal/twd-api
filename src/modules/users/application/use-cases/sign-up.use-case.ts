import { type Either, left, right } from '@/core/application/either'
import { type HashGeneratorGateway } from '@/core/application/gateways/cryptography/hash-generator.gateway'
import { type UseCase } from '@/core/application/use-cases/use-case.contract'
import { type CreateUserRepository } from '@/modules/users/application/repositories/create-user.repository'
import { type FindUserByEmailRepository } from '@/modules/users/application/repositories/find-user-by-email.repository'
import { type UserDTO } from '@/modules/users/application/use-cases/dtos/user.dto'
import { EmailAlreadyExistsError } from '@/modules/users/application/use-cases/errors/email-already-exists.error'
import { InvalidBirthdateError } from '@/modules/users/application/use-cases/errors/invalid-birthdate.error'
import { InvalidEmailError } from '@/modules/users/application/use-cases/errors/invalid-email.error'
import { UserMapper } from '@/modules/users/application/use-cases/mappers/user.mapper'
import { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface SignUpUseCaseInput {
  fullName: string
  birthdate: Date
  email: string
  password: string
}

export type SignUpUseCaseOutput = Either<
  EmailAlreadyExistsError | InvalidEmailError | InvalidBirthdateError,
  {
    user: UserDTO
  }
>

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, SignUpUseCaseOutput>
{
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hashGeneratorGateway: HashGeneratorGateway,
  ) {}

  async execute({
    fullName,
    birthdate,
    password,
    email,
  }: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const foundUser = await this.findUserByEmailRepository.findByEmail(email)
    if (foundUser) {
      return left(new EmailAlreadyExistsError(email))
    }
    const user = UserEntity.create({
      fullName,
      birthdate,
      email,
      password,
    })
    if (!user.email.isValid()) {
      return left(new InvalidEmailError(email))
    }
    if (!user.birthdate.isValid()) {
      return left(new InvalidBirthdateError(birthdate))
    }
    const hashedPassword = await this.hashGeneratorGateway.hash({
      plaintext: user.password,
    })
    user.password = hashedPassword
    const result = await this.createUserRepository.create({ user })
    return right({
      user: UserMapper.toDTO(result.user),
    })
  }
}
