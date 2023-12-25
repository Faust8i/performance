
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRep: Repository<User>,
  ) {}

  /**
  * Поиск пользователя
  * @param email Емайл
  * @returns Пользователь или undefined
  */
  async findOne(email: string): Promise<User | undefined> {
    try {
      return this.usersRep.findOne({ where: { email } });
    } catch (error) {
      const userMessage = 'Произошла ошибка при поиске пользователя: ';
      throw new HttpException(userMessage + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}