import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';

import HttpException from '../exceptions/httpException';

class UploadService {
   private allowedExtensions: string[] = ['png', 'jpeg', 'jpg', 'gif'];

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
}

export default UploadService;
