import { IsNotEmpty, IsArray, IsOptional } from "class-validator";

export class FindArticleDto {

  @IsArray()
  @IsNotEmpty()
  ids: number[];

  @IsArray()
  @IsOptional()
  tags?: string[];

}