import bcrypt from 'bcryptjs';

import User from '../models/user.model';
import HttpException from '../exceptions/httpException';
import { IUser } from '../interfaces/user.interface';
import { generateJWT } from '../utils/jsonWebToken';

export type Login = { token: any; user: IUser };

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
}

export default AuthService;
