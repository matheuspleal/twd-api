import {
  type ValidatorRule,
  type ValidatorField,
} from '@/core/presentation/validators/contracts/validator-rule.contract'
import { InvalidDateError } from '@/core/presentation/validators/errors/invalid-date.error'
import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'

export class IsValidISODateRule implements ValidatorRule {
  private readonly isoDateRegExp =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

  constructor(private readonly input: ValidatorField) {}

  validate(): ValidationError | undefined {
    const value = this.input.value
    const date = new Date(value)
    if (
      (value !== undefined && !this.isoDateRegExp.test(value)) ||
      (value !== undefined && isNaN(date.getTime()))
    ) {
      return new InvalidDateError(this.input.name)
    }
  }
}
