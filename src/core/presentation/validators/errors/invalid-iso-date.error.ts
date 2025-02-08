import { type ValidationError } from '@/core/presentation/validators/errors/validation.error'
import { buildErrorMessage } from '@/core/presentation/validators/helpers/build-error-message.helper'

export class InvalidISODateError
  extends Error
  implements ValidationError<string>
{
  constructor(readonly field = 'date') {
    super(
      buildErrorMessage({
        field,
        reason: 'must be a valid iso date format YYYY-MM-DDTHH:MM:SS.MMMZ!',
      }),
    )
    this.name = 'InvalidDateError'
  }
}
