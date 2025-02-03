/**
 * Sort params contract
 **/

export type SortParams<T extends Record<string, any>> = {
  order: Array<keyof T>
} & {
  [K in keyof T]: {
    direction: 'asc' | 'desc'
    value: T[K]
  }
}
