import { type PrismaOrderByParam } from '@/core/infra/repositories/prisma/types/prisma-order-by-param.type'
import { type SortParams } from '@/core/shared/contracts/sort-params.contract'

export function BuildPrismaSortParam() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const { sort, ...restArgs } = args[0] as {
        sort: SortParams<Record<string, any>>
        [key: string]: any
      }
      const orderBy: PrismaOrderByParam = sort?.order
        ? sort.order.filter(Boolean).map((field: string) => ({
            [field]: sort[field]?.direction,
          }))
        : []
      return originalMethod.apply(this, [{ ...restArgs, orderBy }])
    }
  }
}
