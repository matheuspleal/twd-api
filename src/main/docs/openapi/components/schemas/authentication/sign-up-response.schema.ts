import { type OpenAPIV3_1 } from 'openapi-types'

export const signUpResponseSchema: OpenAPIV3_1.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '678862ec-3ee7-4a90-96f8-30ed2f719bd8',
    },
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
    createdAt: {
      type: 'string',
      example: '2024-01-01T12:00:00.000Z',
    },
    updatedAt: {
      type: 'string',
      example: '2024-01-01T12:00:00.000Z',
    },
  },
  required: ['id', 'fullName', 'birthdate', 'email', 'createdAt', 'updatedAt'],
}
