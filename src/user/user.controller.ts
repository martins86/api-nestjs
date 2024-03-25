import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';

import { UserRepository } from './user.repository';

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
  async getUsers(): Promise<ListUserDTO[]> {
    const users = await this.userRepository.list();
    return users.map((user) => new ListUserDTO(user.id, user.name));
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() editUser: EditUserDTO) {
    const userUpdated = await this.userRepository.update(id, editUser);

    return {
      user: new ListUserDTO(userUpdated.id, userUpdated.name),
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id);

    return {
      user: new ListUserDTO(deletedUser.id, deletedUser.name),
      message: 'Usuário deletado com sucesso',
    };
  }
}
