import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import HttpException from '../exceptions/httpException';

import { LoginUserDto } from '../dtos';
import { generateJWT } from '../utils/jsonWebToken';
import { Login, GoogleSignIn } from '../interfaces/auth.interface';

class AuthController {
   private authService = new AuthService();
   private userService = new UserService();

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

   public googleSignIn = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id_token } = req.body;
         if (!id_token)
            throw new HttpException(
               400,
               'No existe token para realizar la autenticación'
            );

         const userGoogleData: GoogleSignIn = await this.authService.googleSignIn(id_token);

         const user = await this.userService.createGoogleUser(userGoogleData)
         const token: any = await generateJWT(user._id);

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
