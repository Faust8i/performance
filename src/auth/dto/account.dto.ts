import { IsString, IsNotEmpty } from "class-validator";

export class AccountDto {

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

}