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
         const file = req.files?.foo as UploadedFile;

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

   public updateImage = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const file = req.files?.foo as UploadedFile;

         const { collection, id } = req.params;
         const result = await this.uploadService.changeImage(
            collection,
            id,
            file
         );

         res.json({ ok: true, result });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public getFile = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { collection, id } = req.params;
         const imagePath = await this.uploadService.getFile(collection, id);

         res.sendFile(imagePath);
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default UploadsController;
