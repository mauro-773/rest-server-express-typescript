import { Router } from 'express';

import { validationMiddleware } from '../middlewares';
import { LoginUserDto } from '../dtos';
import { IRoute } from '../interfaces/routes.interface';
import AuthController from '../controllers/auth.controller';

class AuthRoute implements IRoute {
   public router = Router();
   private authController = new AuthController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.post(
         '/login',
         validationMiddleware(LoginUserDto),
         this.authController.login
      );
   }
}

export default AuthRoute;
