import { Injectable } from '@nestjs/common';

import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { UserRepository } from 'src/user/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const validateEmail = await this.userRepository.findByEmail(email);
    return !validateEmail;
  }
}

export const EmailIsUnique = (optionsValidation: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: optionsValidation,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
