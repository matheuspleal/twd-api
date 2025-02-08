import {
  type ValidatorRule,
  type ValidatorField,
} from '@/core/presentation/validators/contracts/validator-rule.contract'
import { RequiredError } from '@/core/presentation/validators/errors/required.error'
import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'

export class RequiredRule implements ValidatorRule {
  constructor(private readonly field: ValidatorField) {}

  validate(): ValidationError | undefined {
    if (this.field.value === null || this.field.value === undefined) {
      return new RequiredError(this.field.name, this.field.value)
    }
  }
}
