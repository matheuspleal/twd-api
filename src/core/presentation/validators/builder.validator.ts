import {
  type ValidatorField,
  type ValidatorRule,
} from '@/core/presentation/validators/contracts/validator-rule.contract'
import { IsValidDateRule } from '@/core/presentation/validators/rules/is-valid-date.rule'
import { IsValidISODateRule } from '@/core/presentation/validators/rules/is-valid-iso-date.rule'
import { IsValidPasswordRule } from '@/core/presentation/validators/rules/is-valid-password.rule'
import { IsValidUUIDRule } from '@/core/presentation/validators/rules/is-valid-uuid.rule'
import { RequiredRule } from '@/core/presentation/validators/rules/required.rule'

export class BuilderValidator {
  private constructor(
    private readonly field: ValidatorField,
    private readonly validators: ValidatorRule[] = [],
  ) {}

  static of(field: ValidatorField): BuilderValidator {
    return new BuilderValidator(field)
  }

  isValidDate(): this {
    this.validators.push(new IsValidDateRule(this.field))
    return this
  }

  isValidISODate(): this {
    this.validators.push(new IsValidISODateRule(this.field))
    return this
  }

  isValidPassword(): this {
    this.validators.push(new IsValidPasswordRule(this.field))
    return this
  }

  isValidUUID(): this {
    this.validators.push(new IsValidUUIDRule(this.field))
    return this
  }

  required(): this {
    this.validators.push(new RequiredRule(this.field))
    return this
  }

  build(): ValidatorRule[] {
    return this.validators
  }
}
