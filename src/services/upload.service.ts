import path from 'path';
import fs from 'fs';

import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/user.model';
import Product from '../models/product.model';
import HttpException from '../exceptions/httpException';

class UploadService {
   private allowedExtensions: string[] = ['png', 'jpeg', 'jpg', 'gif'];

   private generateUploadPath(tempName: string, folder: string): string {
      const uploadPath: string = path.join(
         __dirname,
         '..',
         'uploads',
         folder,
         tempName
      );
      return uploadPath;
   }

   private async returnModel(collection: string, id: string) {
      let model;
      switch (collection) {
         case 'users':
            model = await User.findById(id);
            if (!model) {
               throw new HttpException(
                  400,
                  'No existe usuario con el id ' + id
               );
            }
            return model;

         case 'products':
            model = await Product.findById(id);
            if (!model) {
               throw new HttpException(
                  400,
                  'No existe producto con el id ' + id
               );
            }
            return model;

         default:
            throw new HttpException(400, 'Opción no contemplada');
      }
   }

   public async uploadFile(
      file: UploadedFile,
      extensions: string[] = this.allowedExtensions,
      folder: string = ''
   ): Promise<string> {
      const cutName: string[] = file.name.split('.');
      const extension: string = cutName[cutName.length - 1];

      if (!extensions.includes(extension)) {
         throw new HttpException(
            400,
            `${extension} no es una extención válida, extenciones permitidas: ${extensions}`
         );
      }

      const tempName: string = uuidv4() + '.' + extension;
      const uploadPath: string = this.generateUploadPath(tempName, folder);

      try {
         await file.mv(uploadPath);
      } catch (error) {
         console.log(error);
         throw new HttpException(500, error);
      }

      return tempName;
   }

   public async changeImage(
      collection: string,
      id: string,
      file: UploadedFile
   ) {
      /* Segun la coleccion guardamos el modelo */
      let model = await this.returnModel(collection, id);

      /* Limpiar imagenes */
      if (model.imageUrl) {
         const imagePath: string = path.join(
            __dirname,
            '..',
            'uploads',
            collection,
            model.imageUrl
         );
         if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
         }
      }

      /* Imagen - extenciones por defecto - nombre de carpeta a guardar */
      const tempName = await this.uploadFile(file, undefined, collection);
      model.imageUrl = tempName;

      return await model.save();
   }

   public async getFile(collection: string, id: string) {
      const model = await this.returnModel(collection, id);

      if (model.imageUrl) {
         const imagePath: string = path.join(
            __dirname,
            '..',
            'uploads',
            collection,
            model.imageUrl
         );
         if (fs.existsSync(imagePath)) {
            return imagePath;
         }
      }

      const defaultImage: string = path.join(
         __dirname,
         '..',
         'assets',
         'no-image.jpg'
      );
      return defaultImage;
   }
}

export default UploadService;
