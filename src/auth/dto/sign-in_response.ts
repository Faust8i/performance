import { IsString, IsNotEmpty } from "class-validator";

export class SignInResponseDto {

  @IsString()
  @IsNotEmpty()
  readonly access_token: string;

}