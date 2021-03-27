import { Router } from 'express';

import FindController from '../controllers/find.controller';
import { IRoute } from '../interfaces/routes.interface';

class FindRoute implements IRoute {
   public router = Router();
   private findController = new FindController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.get('/:collection/:term', this.findController.find);
   }
}

export default FindRoute;
