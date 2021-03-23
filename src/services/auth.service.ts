import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

import User from '../models/user.model';
import HttpException from '../exceptions/httpException';
import { IUser } from '../interfaces/user.interface';
import { generateJWT } from '../utils/jsonWebToken';
import {
   Login,
   GoogleSignIn,
   IGoogleSignin,
} from '../interfaces/auth.interface';

class AuthService {
   private User = User;

   public async login(email: string, password: string): Promise<Login> {
      const query = { email, state: true };
      const user = (await this.User.findOne(query)) as IUser;
      if (!user)
         throw new HttpException(400, `Usuario / Contraseña no son correctos`);

      const isPasswordMatch = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatch)
         throw new HttpException(401, 'Usuario / Contraseña no son correctos');

      const token: any = await generateJWT(user._id);

      return { user, token };
   }

   public async googleSignIn(idToken: string): Promise<GoogleSignIn> {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
         idToken,
         audience: process.env.GOOGLE_CLIENT_ID,
      });

      const {
         name,
         picture: imageUrl,
         email,
      } = ticket.getPayload() as IGoogleSignin;

      return { name, imageUrl, email };
   }
}

export default AuthService;
