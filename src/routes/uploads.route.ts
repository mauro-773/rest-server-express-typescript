import { Router } from 'express';

import UploadsController from '../controllers/uploads.controller';
import { IRoute } from '../interfaces/routes.interface';

class UploadsRoute implements IRoute {
   public router = Router();
   private uploadsController = new UploadsController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.post('/', this.uploadsController.postFile);
   }
}

export default UploadsRoute;
