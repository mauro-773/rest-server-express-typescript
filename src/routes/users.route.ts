import { Router } from 'express';

import UsersController from '../controllers/users.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
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
      this.router.patch('/', this.usersController.patchUser);
      this.router.delete('/:userId', this.usersController.deleteUser);
   }
}

export default UserRoute;
