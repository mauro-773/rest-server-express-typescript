import { Router } from 'express';

import UsersController from '../controllers/users.controller';
import {
   validationMiddleware,
   verifyJwtMiddleware,
   isAdminMiddleware,
} from '../middlewares';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { IRoute } from '../interfaces/routes.interface';

class UserRoute implements IRoute {
   public router = Router();
   private usersController = new UsersController();

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router.get('/', this.usersController.getUsers);
      this.router.post(
         '/',
         validationMiddleware(CreateUserDto),
         this.usersController.postUser
      );
      this.router.put(
         '/:userId',
         validationMiddleware(UpdateUserDto),
         this.usersController.putUser
      );
      this.router.delete(
         '/:userId',
         [verifyJwtMiddleware, isAdminMiddleware],
         this.usersController.deleteUser
      );
   }
}

export default UserRoute;
