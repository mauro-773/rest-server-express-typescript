import { Router } from 'express';

import UploadsController from '../controllers/uploads.controller';
import { IRoute } from '../interfaces/routes.interface';
import { hasMongoIdOrCollection, hasFile } from '../middlewares';

class UploadsRoute implements IRoute {
   public router = Router();
   private uploadsController = new UploadsController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.get(
         '/:collection/:id',
         hasMongoIdOrCollection,
         this.uploadsController.getFile
      );

      this.router.post('/', hasFile, this.uploadsController.postFile);

      this.router.put(
         '/:collection/:id',
         [hasFile, hasMongoIdOrCollection],
         this.uploadsController.updateImage
      );
   }
}

export default UploadsRoute;
