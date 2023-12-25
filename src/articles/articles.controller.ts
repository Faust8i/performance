import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../entities/article.entity';
import { DeleteArticleResponseDto } from './dto/delete-article-response.dto';
import { FindArticleDto } from './dto/find-article.dto'
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/decorator/public.decorator';
import { UserParam } from '../decorators/user-jwt.decorator';

@UseGuards(AuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @UserParam() userId:  number,
    @Body() article: CreateArticleDto,
    ): Promise<Article> {
      return this.articlesService.create(userId, article);
  }

  @Patch()
  update(
    @Query('id') id: string, 
    @Body() article: UpdateArticleDto,
    ): Promise<Article> {
      return this.articlesService.update(+id, article);
  }

  @Delete()
  delete(
    @Query('id') id: string,
    ): Promise<DeleteArticleResponseDto> {
      return this.articlesService.delete(+id);
  }

  @Public()
  @Get()
  find(
    @UserParam() userId:  number,
    @Body() filter: FindArticleDto,
    ): Promise<Article[]> {
      return this.articlesService.find(userId, filter);
  }

}