import {
  DEFAULT_OFFSET,
  MAX_LIMIT,
} from '@/core/shared/constants/pagination-params.const'
import { type PaginationParams } from '@/core/shared/contracts/pagination-params.contract'

function resolveOffset(offset?: number): number {
  if (!offset || offset < 0) {
    return DEFAULT_OFFSET
  }
  return offset
}

function resolveLimit(limit?: number): number {
  if (!limit || limit < 0 || limit > MAX_LIMIT) {
    return MAX_LIMIT
  }
  return limit
}

export interface ResolvePaginationParamsProps {
  offset?: number
  limit?: number
}

export function resolvePaginationParams(
  resolvePaginationParams?: ResolvePaginationParamsProps,
): PaginationParams {
  return {
    offset: resolveOffset(resolvePaginationParams?.offset),
    limit: resolveLimit(resolvePaginationParams?.limit),
  }
}
