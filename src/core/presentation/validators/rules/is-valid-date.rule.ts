import {
  type ValidatorRule,
  type ValidatorField,
} from '@/core/presentation/validators/contracts/validator-rule.contract'
import { InvalidDateError } from '@/core/presentation/validators/errors/invalid-date.error'
import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'

export class IsValidDateRule implements ValidatorRule {
  private readonly dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

  constructor(private readonly input: ValidatorField) {}

  validate(): ValidationError | undefined {
    const value = this.input.value
    if (value === undefined) {
      return undefined
    }
    const date = new Date(value)
    if (
      (value !== undefined && !this.dateRegExp.test(value)) ||
      (value !== undefined && isNaN(date.getTime()))
    ) {
      return new InvalidDateError(this.input.name)
    }
  }
}
