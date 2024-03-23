import { Body, Controller, Get, Post } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

import { UserRepository } from './user.repository';
import { ListUserDTO } from './dto/list-user.dto';

@Controller('/api/v1/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;

    userEntity.id = uuid();

    this.userRepository.save(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async getUsers() {
    const users = await this.userRepository.list();
    return users.map((user) => new ListUserDTO(user.id, user.name));
  }
}
