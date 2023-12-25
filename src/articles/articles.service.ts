import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeleteArticleResponseDto } from './dto/delete-article-response.dto';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly articlesRep: Repository<Article>,
  ) {}

  /**
  * Создание новой статьи
  * @param userId Идентификатор пользователя
  * @param article Статья
  * @returns Созданная статья
  */
  async create(userId: number, article: CreateArticleDto): Promise<Article>{
    try {
      article['creator_id'] = userId;
      const insertResult = await this.articlesRep.insert(article);
      const createdArticleID = insertResult.identifiers[0]['id'];
      return await this.articlesRep.findOne({ where: {id: createdArticleID} });
    } catch (error) {
      const userMessage = 'Произошла ошибка при создании новой статьи: ';
      throw new HttpException(userMessage + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Обновление статьи
  * @param id Идентификатор статьи
  * @param acticle Обновляемые поля
  * @returns Обновленная статья
  */
  async update(id: number, acticle: UpdateArticleDto) {
    try {
      const articleToUpdate = await this.articlesRep.findOne({ where: {id} });
      if (!articleToUpdate)
        throw new Error(`Статья с id=${id} не найдена.`);
      Object.assign(articleToUpdate, acticle);
      return await this.articlesRep.save(articleToUpdate);
    } catch (error) {
      const userMessage = 'Произошла ошибка при обновлении статьи: ';
      throw new HttpException(userMessage + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление статьи
  * @param id Идентификатор статьи
  * @returns Сообщение об успешности
  */
  async delete(id: number): Promise<DeleteArticleResponseDto> {
    try {
      const articleToUpdate = await this.articlesRep.findOne({ where: {id} });
      if (!articleToUpdate) 
        throw new Error(`Статья с id=${id} не найдена.`);
      await this.articlesRep.softDelete(id);
      return { message: `Статья с id=${id} удалена.` };
    } catch (error) {
      const userMessage = 'Произошла ошибка при удалении статьи: ';
      throw new HttpException(userMessage + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получить статьи
  * @param userId Идентификатор пользователя
  * @param filter Параметры фильтрации
  * @returns Массив статей
  */
  async find(userId: number, filter: FindArticleDto): Promise<Article[]> {
    try {
      const { ids, tags } = filter;
      if (!ids.length) return [];
      const queryBulder = await this.articlesRep.createQueryBuilder()
        .where({id: In(ids)});
      if (tags?.length) queryBulder
        .andWhere(tags.map(tag => `lower(tags) like '%${tag.toLowerCase()}%'`).join(' or '));
      if (userId === -1) queryBulder
        .andWhere({is_public: true});
      return queryBulder.getMany();
    } catch (error) {
      const userMessage = 'Произошла ошибка при поиске статей: ';
      throw new HttpException(userMessage + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}