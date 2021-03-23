import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares';
import { LoginUserDto } from '../dtos';
import { IRoute } from '../interfaces/routes.interface';

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

      this.router.post('/google', this.authController.googleSignIn);
   }
}

export default AuthRoute;
