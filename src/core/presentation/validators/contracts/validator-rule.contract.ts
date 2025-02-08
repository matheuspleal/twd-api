import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'

export interface ValidatorField {
  name: string
  value: any
}

export interface ValidatorRule {
  validate(): ValidationError | undefined
}
