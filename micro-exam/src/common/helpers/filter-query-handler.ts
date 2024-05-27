import { Brackets, SelectQueryBuilder } from 'typeorm'

export function applyOrFilters<T = any>(
  qb: SelectQueryBuilder<any>,
  filter?: Partial<T>,
): void {
  if (filter) {
    new Brackets((qb) => {
      Object.entries(filter).forEach(([k, v]) => {
        const { key, value } = verifyNode(k, v)

        if (!isNaN(Number(value))) {
          qb.orWhere({ [key]: Number(value) })
          return
        }

        if (typeof value === 'string') {
          qb.orWhere(`${key} ILIKE '%${value}%'`)
        }
      })
    })
  }
}

function verifyNode(key: string, value: any): { key: string; value: any } {
  let composedKey = ''
  if (typeof value === 'object') {
    composedKey = key.concat('.').concat(Object.keys(value).at(0))
    value = Object.values(value).at(0)
    verifyNode(key, value)
  }
  return { key: composedKey, value }
}
