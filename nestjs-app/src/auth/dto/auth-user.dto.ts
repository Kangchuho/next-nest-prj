import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'password only accepts en-num',
  })
  password: string;
}