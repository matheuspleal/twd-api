import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'

export function resolveOffsetByPageAndLimit({ page, limit }: PaginationParams) {
  return (page - 1) * limit
}
