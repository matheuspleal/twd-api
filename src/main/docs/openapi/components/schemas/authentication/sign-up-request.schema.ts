import { type OpenAPIV3_1 } from 'openapi-types'

export const signUpRequestSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      example: 'John Doe',
    },
    birthdate: {
      type: 'string',
      example: '2000-01-01',
    },
    email: {
      type: 'string',
      example: 'john.doe@domain.com',
    },
    password: {
      type: 'string',
      example: 'P@ssw0rd!123',
    },
  },
  required: ['fullName', 'birthdate', 'email', 'password'],
}
