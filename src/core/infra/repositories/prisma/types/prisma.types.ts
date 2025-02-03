import { type PrismaOrderByParam } from '@/core/infra/repositories/prisma/types/prisma-order-by-param.type'
import { type PrismaPaginationParams } from '@/core/infra/repositories/prisma/types/prisma-pagination.params.type'

export interface PrismaTypes {
  pagination: PrismaPaginationParams
  orderBy: PrismaOrderByParam
}
