import { type OpenAPIV3_1 } from 'openapi-types'

import {
  pageLimitParams,
  pageOffsetParams,
} from '@/main/docs/openapi/components/parameters'
import {
  badRequest,
  notFound,
  serverError,
  unauthorized,
} from '@/main/docs/openapi/components/responses'
import { errorSchema } from '@/main/docs/openapi/components/schemas'
import {
  accessTokenSchema,
  signInRequestSchema,
  signUpRequestSchema,
  signUpResponseSchema,
} from '@/main/docs/openapi/components/schemas/authentication'
import { bearerAuthSecurityScheme } from '@/main/docs/openapi/components/security-schemes'

const responses: Record<string, OpenAPIV3_1.ResponseObject> = {
  badRequest,
  serverError,
  unauthorized,
  notFound,
}

const schemas: Record<string, OpenAPIV3_1.SchemaObject> = {
  error: errorSchema,
  accessToken: accessTokenSchema,
  signInRequest: signInRequestSchema,
  signUpRequest: signUpRequestSchema,
  signUpResponse: signUpResponseSchema,
}

export const securitySchemes: Record<string, OpenAPIV3_1.SecuritySchemeObject> =
  {
    bearerAuth: bearerAuthSecurityScheme,
  }

const parameters: Record<string, OpenAPIV3_1.ParameterObject> = {
  pageLimit: pageLimitParams,
  pageOffset: pageOffsetParams,
}

export default {
  responses,
  schemas,
  parameters,
  securitySchemes,
} satisfies OpenAPIV3_1.ComponentsObject
