import { resolveOffsetByPageAndLimit } from '@/core/infra/repositories/helpers/resolve-offset-by-pagination-params.helper'
import { type PrismaPaginationParams } from '@/core/infra/repositories/prisma/types/prisma-pagination.params.type'
import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'

export function BuildPrismaTakeLimitParams() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const { pagination, ...restArgs } = args[0] as {
        pagination: PaginationParams
        [key: string]: any
      }
      const prismaPagination: PrismaPaginationParams = {
        skip: resolveOffsetByPageAndLimit({
          page: pagination.page,
          limit: pagination.limit,
        }),
        take: pagination.limit,
      }
      return originalMethod.apply(this, [
        { ...restArgs, pagination: prismaPagination },
      ])
    }
  }
}
