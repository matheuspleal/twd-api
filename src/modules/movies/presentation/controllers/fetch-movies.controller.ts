import { HttpController } from '@/core/presentation/controllers/http.controller'
import { ok } from '@/core/presentation/helpers/http-response.helper'
import { type HttpResponse } from '@/core/presentation/protocols/http'
// import { BuilderValidator } from '@/core/presentation/validators/builder.validator'
// import { type ValidatorRule } from '@/core/presentation/validators/contracts/validator-rule.contract'
import { type FetchMoviesUseCase } from '@/modules/movies/application/use-cases/fetch-movies.use-case'

export interface FetchMoviesControllerRequest {
  'filter[id]'?: string
  'filter[title]'?: string
  'filter[description]'?: string
  'filter[releaseDate]'?: Date
  'filter[createdAt]'?: Date
  'filter[updatedAt]'?: Date
}

export type FetchMoviesControllerResponse = Error | { movies: [] }

export class FetchMoviesController extends HttpController<
  FetchMoviesControllerRequest,
  FetchMoviesControllerResponse
> {
  constructor(private readonly fetchMoviesUseCase: FetchMoviesUseCase) {
    super()
  }

  // override buildValidators(
  //   request: FetchMoviesControllerRequest,
  // ): ValidatorRule[] {
  //   const allRequiredFields: Array<keyof FetchMoviesControllerRequest> = [
  //     'fullName',
  //     'birthdate',
  //     'email',
  //     'password',
  //   ]
  //   const validations: ValidatorRule[] = []
  //   validations.push(
  //     ...allRequiredFields.flatMap((requiredField) =>
  //       BuilderValidator.of({
  //         name: requiredField,
  //         value: request[requiredField],
  //       })
  //         .required()
  //         .build(),
  //     ),
  //   )
  //   validations.push(
  //     ...BuilderValidator.of({ name: 'password', value: request.password })
  //       .isValidPassword()
  //       .build(),
  //   )
  //   return validations
  // }

  override async perform(
    request: FetchMoviesControllerRequest,
  ): Promise<HttpResponse<FetchMoviesControllerResponse>> {
    console.log({ request })
    return ok({ movies: [] })
  }
}
