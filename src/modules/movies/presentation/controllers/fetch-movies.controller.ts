import { HttpController } from '@/core/presentation/controllers/http.controller'
import {
  ok,
  serverError,
} from '@/core/presentation/helpers/http-response.helper'
import { type HttpResponse } from '@/core/presentation/protocols/http'
import { BuilderValidator } from '@/core/presentation/validators/builder.validator'
import { type ValidatorRule } from '@/core/presentation/validators/contracts/validator-rule.contract'
import { type SortParams } from '@/core/shared/contracts/sort-params.contract'
import { type FetchMoviesUseCase } from '@/modules/movies/application/use-cases/fetch-movies.use-case'

export interface FetchMoviesFilter {
  id?: string
  title?: string
  description?: string
  releaseDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface FetchMoviesSort {
  id?: string
  title?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FetchMoviesControllerRequest {
  page: {
    offset: number
    limit: number
  }
  filter?: FetchMoviesFilter
  sort?: SortParams<FetchMoviesSort>
}

export type FetchMoviesControllerResponse = Error | { movies: [] }

export class FetchMoviesController extends HttpController<
  FetchMoviesControllerRequest,
  FetchMoviesControllerResponse
> {
  constructor(private readonly fetchMoviesUseCase: FetchMoviesUseCase) {
    super()
  }

  override buildValidators(
    request: FetchMoviesControllerRequest,
  ): ValidatorRule[] {
    const allRequiredFields: Array<keyof FetchMoviesControllerRequest> = [
      'fullName',
      'birthdate',
      'email',
      'password',
    ]
    const validations: ValidatorRule[] = []
    validations.push(
      ...allRequiredFields.flatMap((requiredField) =>
        BuilderValidator.of({
          name: requiredField,
          value: request[requiredField],
        })
          .required()
          .build(),
      ),
    )
    validations.push(
      ...BuilderValidator.of({ name: 'password', value: request.password })
        .isValidPassword()
        .build(),
    )
    return validations
  }

  override async perform(
    request: FetchMoviesControllerRequest,
  ): Promise<HttpResponse<FetchMoviesControllerResponse>> {
    const { page, filter, sort } = request
    const result = await this.fetchMoviesUseCase.execute({
      pagination: page,
      filter,
      sort,
    })
    if (result.isLeft()) {
      return serverError(result.value)
    }
    return ok({ movies: result.value.movies as any })
  }
}
