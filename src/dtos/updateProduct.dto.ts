import {
   IsBoolean,
   IsNumberString,
   IsOptional,
   IsString,
} from 'class-validator';

export class UpdateProductDto {
   @IsString({ message: 'El nombre tiene que ser un string' })
   public name: string;

   @IsOptional()
   @IsString({ message: 'La descripción tiene que ser un string' })
   public desc: string;

   @IsOptional()
   @IsNumberString()
   public price: number;

   @IsOptional()
   @IsBoolean({ message: 'Tiene que ser un valor booleano' })
   public available: boolean;
}
