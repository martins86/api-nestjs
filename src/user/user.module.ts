import { Module } from '@nestjs/common';

import { EmailIsUniqueValidator } from './validators/email-is-unique.validator';

import { UserController } from './user.controller';

import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailIsUniqueValidator],
})
export class UserModule {}
