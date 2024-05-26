import { BaseEntity } from 'typeorm'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export function ExistsValidator(
  entity: typeof BaseEntity,
  fieldName: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, fieldName],
      validator: ExistsConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'ExistsValidator', async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return `Not found any entity`
  }

  validate = async (
    value: any,
    args?: ValidationArguments,
  ): Promise<boolean> => {
    const [entity, fieldName] = args!.constraints
    if (value instanceof Object) {
      value = value[fieldName]
    }
    const result = await entity.findOne({ where: { [fieldName]: value } })
    return !!result
  }
}
