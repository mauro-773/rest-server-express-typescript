import { Router } from 'express';

import UserController from '../controllers/user.controller';
import IRoute from '../interfaces/routes.interface';

class UserRoute implements IRoute {
   public router = Router();
   private userController = new UserController();

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router.get('/', this.userController.getUsers);
      this.router.post('/', this.userController.postUser);
      this.router.put('/:id', this.userController.putUser);
      this.router.patch('/', this.userController.patchUser);
      this.router.delete('/', this.userController.deleteUser);
   }
}

export default UserRoute;
