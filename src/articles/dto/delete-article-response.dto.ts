import { IsString, IsNotEmpty } from "class-validator";

export class DeleteArticleResponseDto {

  @IsString()
  @IsNotEmpty()
  message: string;

}