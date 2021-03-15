import {
   IsBoolean,
   IsEmail,
   IsEnum,
   IsNotEmpty,
   IsOptional,
   IsUrl,
   MinLength,
} from 'class-validator';

enum enumRoles {
   admin_role = 'ADMIN_ROLE',
   user_role = 'USER_ROLE',
}

export class CreateUserDto {
   @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
   public name?: string;

   @IsEmail()
   public email: string;

   @MinLength(6, {
      message: 'La contraseña debe tener un mínimo de 6 carácteres',
   })
   public password: string;

   @IsOptional()
   @IsUrl()
   public imageUrl?: string;

   @IsNotEmpty({ message: 'El rol es obligatorio' })
   @IsEnum(enumRoles, { message: 'Roles válidos: ADMIN_ROLE - USER_ROLE' })
   public role?: string;

   @IsOptional()
   @IsBoolean()
   public state?: boolean;

   @IsOptional()
   @IsBoolean()
   public google?: boolean;
}
