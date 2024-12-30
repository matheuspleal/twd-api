import { type MockInstance } from 'vitest'
import { type MockProxy, mock } from 'vitest-mock-extended'

import { left, right } from '@/core/application/either'
import { StatusCode } from '@/core/presentation/helpers/http-response.helper'
import { InvalidPasswordError } from '@/core/presentation/validators/errors/invalid-password.error'
import { RequiredError } from '@/core/presentation/validators/errors/required.error'
import { ValidationCompositeError } from '@/core/presentation/validators/errors/validation-composite.error'
import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'
import { type UserDTO } from '@/modules/users/application/use-cases/dtos/user.dto'
import { EmailAlreadyExistsError } from '@/modules/users/application/use-cases/errors/email-already-exists.error'
import { InvalidBirthdateError } from '@/modules/users/application/use-cases/errors/invalid-birthdate.error'
import { InvalidEmailError } from '@/modules/users/application/use-cases/errors/invalid-email.error'
import { type SignUpUseCase } from '@/modules/users/application/use-cases/sign-up.use-case'
import {
  SignUpController,
  type SignUpControllerRequest,
} from '@/modules/users/presentation/controllers/sign-up.controller'

import { plaintextPasswordStub } from '#/modules/users/application/@mocks/password-stub'
import { makeRequiredSignUpInputStub } from '#/modules/users/application/@mocks/sign-up-input-stub'
import { makeUserDTOStub } from '#/modules/users/application/@mocks/user-dto-stub'

const listOfFields = ['fullName', 'birthdate', 'email', 'password']

describe('SignUpController', () => {
  let sut: SignUpController
  let userDTOStub: UserDTO
  let signUpUseCaseMock: MockProxy<SignUpUseCase>
  let signUpUseCaseSpy: MockInstance

  beforeAll(() => {
    userDTOStub = makeUserDTOStub()
    signUpUseCaseMock = mock<SignUpUseCase>()
    signUpUseCaseMock.execute.mockResolvedValue(
      right({
        user: userDTOStub,
      }),
    )
  })

  beforeEach(() => {
    signUpUseCaseSpy = vi.spyOn(signUpUseCaseMock, 'execute')
    sut = new SignUpController(signUpUseCaseMock)
  })

  it('should be able to return RequiredFieldError when all required fields is not provided', async () => {
    const fakeSignUpInput = {} as any

    const response = await sut.handle(fakeSignUpInput)

    expect(signUpUseCaseSpy).toHaveBeenCalledTimes(0)
    expect(response).toEqual({
      statusCode: StatusCode.BAD_REQUEST,
      data: new ValidationCompositeError([
        ...listOfFields.map(
          (field) => new RequiredError(field, fakeSignUpInput[field]),
        ),
        new InvalidPasswordError('password'),
      ]),
    })
  })

  it.each(listOfFields)(
    'should be able to return RequiredFieldError when "%s" is not provided',
    async (field) => {
      const fakeSignUpInput: any = {
        ...makeRequiredSignUpInputStub(),
      }
      fakeSignUpInput[field] = undefined

      const errors: ValidationError[] = [
        new RequiredError(field, fakeSignUpInput[field]),
      ]
      if (field === 'password') {
        errors.push(new InvalidPasswordError(field))
      }

      const response = await sut.handle(fakeSignUpInput)

      expect(signUpUseCaseSpy).toHaveBeenCalledTimes(0)
      expect(response).toEqual({
        statusCode: StatusCode.BAD_REQUEST,
        data: new ValidationCompositeError(errors),
      })
    },
  )

  it('should be able to return EmailAlreadyExistsError when the informed email already exists', async () => {
    const fakeEmailAlreadyExistsError = new EmailAlreadyExistsError(
      userDTOStub.email,
    )
    signUpUseCaseMock.execute.mockResolvedValueOnce(
      left(fakeEmailAlreadyExistsError),
    )

    const fakeSignUpInput: SignUpControllerRequest = {
      fullName: userDTOStub.fullName,
      birthdate: userDTOStub.birthdate.toISOString(),
      email: userDTOStub.email,
      password: plaintextPasswordStub,
    }

    const { statusCode, data } = await sut.handle(fakeSignUpInput)

    expect(statusCode).toEqual(StatusCode.CONFLICT)
    expect(data).toEqual(new EmailAlreadyExistsError(userDTOStub.email))
  })

  it('should be able to return InvalidEmailError when the informed email is invalid', async () => {
    const fakeInvalidEmailError = new InvalidEmailError(userDTOStub.email)
    signUpUseCaseMock.execute.mockResolvedValueOnce(left(fakeInvalidEmailError))

    const fakeSignUpInput: SignUpControllerRequest = {
      fullName: userDTOStub.fullName,
      birthdate: userDTOStub.birthdate.toISOString(),
      email: userDTOStub.email,
      password: plaintextPasswordStub,
    }

    const { statusCode, data } = await sut.handle(fakeSignUpInput)

    expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
    expect(data).toEqual(new InvalidEmailError(userDTOStub.email))
  })

  it('should be able to return InvalidBirthdateError when the informed birthdate is invalid', async () => {
    const fakeInvalidBirthdateError = new InvalidBirthdateError(
      userDTOStub.birthdate,
    )
    signUpUseCaseMock.execute.mockResolvedValueOnce(
      left(fakeInvalidBirthdateError),
    )

    const fakeSignUpInput: SignUpControllerRequest = {
      fullName: userDTOStub.fullName,
      birthdate: userDTOStub.birthdate.toISOString(),
      email: userDTOStub.email,
      password: plaintextPasswordStub,
    }

    const { statusCode, data } = await sut.handle(fakeSignUpInput)

    expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
    expect(data).toEqual(new InvalidBirthdateError(userDTOStub.birthdate))
  })

  it('should be able to return the created user when the user was created successfully', async () => {
    const fakeSignUpInput: SignUpControllerRequest = {
      fullName: userDTOStub.fullName,
      birthdate: userDTOStub.birthdate.toISOString(),
      email: userDTOStub.email,
      password: plaintextPasswordStub,
    }

    const response = await sut.handle(fakeSignUpInput)

    expect(signUpUseCaseSpy).toHaveBeenCalledTimes(1)
    expect(signUpUseCaseSpy).toHaveBeenCalledWith({
      fullName: userDTOStub.fullName,
      birthdate: userDTOStub.birthdate,
      password: plaintextPasswordStub,
      email: userDTOStub.email,
    })
    expect(response).toEqual({
      statusCode: StatusCode.CREATED,
      data: {
        user: {
          id: userDTOStub.id,
          fullName: userDTOStub.fullName,
          birthdate: userDTOStub.birthdate,
          email: userDTOStub.email,
          createdAt: userDTOStub.createdAt,
          updatedAt: userDTOStub.updatedAt,
        },
      },
    })
  })
})
