import { IsString, IsOptional, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateArticleDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsBoolean()
  @IsOptional()
  is_public?: boolean;

}