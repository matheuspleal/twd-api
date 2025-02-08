import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'
import { buildErrorMessage } from '@/core/presentation/validators/helpers/build-error-message.helper'

export class InvalidDateError extends Error implements ValidationError<string> {
  constructor(readonly field = 'date') {
    super(
      buildErrorMessage({
        field,
        reason: 'must be a valid date in the format YYYY-MM-DD!',
      }),
    )
    this.name = 'InvalidDateError'
  }
}
