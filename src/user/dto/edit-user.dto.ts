import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { EmailIsUnique } from '../validators/email-is-unique.validator';

export class EditUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail inválido.' })
  @EmailIsUnique({ message: 'Já existe um registro com este e-mail.' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' })
  @IsOptional()
  password: string;
}
