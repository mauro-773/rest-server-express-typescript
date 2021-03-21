import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
   @IsEmail()
   public email: string;

   @MinLength(6, {
      message: 'La contraseña debe tener un mínimo de 6 carácteres',
   })
   public password: string;
}
