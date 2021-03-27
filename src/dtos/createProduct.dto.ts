import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
   @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
   public name: string;

   @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
   public desc: string;

   @IsMongoId()
   public category: string;

   @IsOptional()
   @IsNotEmpty({ message: 'El precio no puede estar vacío' })
   public price: number;

   @IsOptional()
   @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
   public available: boolean;
}
