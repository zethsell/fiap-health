import {
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common'
import { BaseEntity } from 'typeorm'
import { getEntityNameHelper } from '../helpers'

export class EntityValidationPipe implements PipeTransform {
  constructor(
    private readonly entity: typeof BaseEntity,
    private readonly field = 'id',
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `the value from param ${metadata.data} must to be defined!`,
      )
    }

    const entity = getEntityNameHelper(this.entity)

    const result = await this.entity.findOne({ where: { [this.field]: value } })
    if (!result) {
      throw new NotFoundException(`No ${entity} was found!`)
    }

    return value
  }
}
