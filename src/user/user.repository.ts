import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<boolean> {
    const findEmail = await this.users.find((user) => user.email === email);
    return findEmail != undefined;
  }

  async update(id: string, editUser: Partial<UserEntity>) {
    const userFound = await this.findById(id);

    Object.entries(editUser).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      userFound[key] = value;
    });

    return userFound;
  }

  async delete(id: string): Promise<UserEntity> {
    const userFound = await this.findById(id);

    this.users = this.users.filter((user) => user.id !== id);

    return userFound;
  }

  async findById(id: string): Promise<UserEntity> {
    const userFound = await this.users.find((user) => user.id === id);

    if (!userFound) {
      throw new Error('Usuário não encontrado!');
    }

    return userFound;
  }
}
