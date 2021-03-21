import { Request, Response, NextFunction } from 'express';

import AuthService, { Login } from '../services/auth.service';
import { LoginUserDto } from '../dtos';

class AuthController {
   private authService = new AuthService();

   public login = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { email, password }: LoginUserDto = req.body;
         const { user, token }: Login = await this.authService.login(
            email,
            password
         );

         res.json({
            ok: true,
            user,
            token,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default AuthController;
