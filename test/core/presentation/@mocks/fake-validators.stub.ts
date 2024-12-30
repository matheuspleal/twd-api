import { faker } from '@faker-js/faker'

import { IsValidPasswordRule } from '@/core/presentation/validators/rules/is-valid-password.rule'
import { IsValidUUIDRule } from '@/core/presentation/validators/rules/is-valid-uuid.rule'
import { RequiredRule } from '@/core/presentation/validators/rules/required.rule'

import { type CollectionStubProps } from '#/@types/collection-stub-props-contract'
import { makeFakeFieldStub } from '#/core/presentation/@mocks/fake-field.stub'
import { type FieldPropsStub } from '#/core/presentation/@mocks/field-props.stub'

export function makeFakeValidatorStub({ withValue }: FieldPropsStub) {
  const RandomValidator = faker.helpers.arrayElement([
    RequiredRule,
    IsValidUUIDRule,
    IsValidPasswordRule,
  ])
  return new RandomValidator(makeFakeFieldStub({ withValue }))
}

export function makeFakeCollectionValidatorStub({
  withValue,
  length,
}: FieldPropsStub & CollectionStubProps) {
  return Array.from({ length }).map(() => makeFakeValidatorStub({ withValue }))
}
