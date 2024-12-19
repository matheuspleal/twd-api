import { type OpenAPIV3_1 } from 'openapi-types'

import {
  signInPath,
  signUpPath,
} from '@/main/docs/openapi/paths/authentication'

export default {
  '/signin': signInPath,
  '/signup': signUpPath,
} satisfies Record<string, OpenAPIV3_1.PathItemObject>
