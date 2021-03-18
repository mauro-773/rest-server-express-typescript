import {
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

export class UpdateUserDto {
   @IsOptional()
   @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
   public name?: string;

   @IsOptional()
   @MinLength(6, {
      message: 'La contraseña debe tener un mínimo de 6 carácteres',
   })
   public password: string;

   @IsOptional()
   @IsUrl()
   public imageUrl?: string;

   @IsOptional()
   @IsNotEmpty({ message: 'El rol es obligatorio' })
   @IsEnum(enumRoles, { message: 'No es un rol válido' })
   public role?: string;
}
