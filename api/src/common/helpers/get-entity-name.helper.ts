import { BaseEntity } from 'typeorm'

export const getEntityNameHelper = (entity: typeof BaseEntity): string =>
  `${entity.toString()}`.match(/\w+/g)[1].replace('Entity', '')
