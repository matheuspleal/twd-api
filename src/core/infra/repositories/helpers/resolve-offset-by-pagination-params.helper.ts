import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'

export function resolveOffsetByPageAndLimit({
  offset,
  limit,
}: PaginationParams) {
  return (offset - 1) * limit
}
