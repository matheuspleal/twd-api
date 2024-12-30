import { faker } from '@faker-js/faker'

import { type Validator } from '@/core/presentation/validators/contracts/validator-rule.contract'

import { type FieldPropsStub } from '#/core/presentation/@mocks/field-props.stub'

export function makeFakeFieldStub({
  withValue,
}: FieldPropsStub): Validator.Field {
  return {
    name: faker.word.noun({ strategy: 'shortest' }),
    value: withValue
      ? faker.word.noun({ strategy: 'shortest' })
      : faker.helpers.arrayElement([null, undefined]),
  }
}
