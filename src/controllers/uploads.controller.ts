import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

import UploadService from '../services/upload.service';

class UploadsController {
   private uploadService = new UploadService();

   public postFile = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
               ok: false,
               msg: 'No hay archivos para subir',
            });
         }

         const file = req.files.foo as UploadedFile;

         //const allowedExtensions: string[] = ['txt', 'md'];
         const folderName: string = 'images';
         const fileName: string = await this.uploadService.uploadFile(
            file,
            undefined,
            folderName
         );

         res.json({
            ok: true,
            msg: 'El archivo se subió correctamente',
            fileName,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default UploadsController;
