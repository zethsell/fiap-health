import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { BaseEntity, Not } from 'typeorm'

export function UniqueValidator(
  entity: typeof BaseEntity,
  fieldName: string,
  message = '',
  validationOptions?: ValidationOptions,
) {
  if (message === '') message = `${fieldName} must be unique`
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, fieldName, message],
      validator: UniqueConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'UniqueValidator', async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  defaultMessage(args?: ValidationArguments): string {
    const [, , message] = args.constraints
    return message
  }

  validate = async (
    value: any,
    args?: ValidationArguments,
  ): Promise<boolean> => {
    const [entity, fieldName] = args.constraints
    const result = args.object['id']
      ? await entity.findOne({
          where: { [fieldName]: value, id: Not(args.object['id']) },
        })
      : await entity.findOne({ where: { [fieldName]: value } })
    return !result
  }
}
