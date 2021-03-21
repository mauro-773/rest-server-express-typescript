import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import {
   RequestWithUid,
   DataStoredInToken,
} from '../interfaces/auth.interface';
import HttpException from '../exceptions/httpException';
import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export const verifyJWT = async (
   req: RequestWithUid,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const token = req.header('x-token');

      if (token) {
         const { uid } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED!
         ) as DataStoredInToken;

         const user: IUser = (await User.findById(uid)) as IUser;

         if (!user) next(new HttpException(404, 'Usuario no encontrado'));
         if (!user.state) {
            next(new HttpException(403, 'El usuario está borrado'));
         }

         req.uid = uid;

         return next();
      } else {
         return next(new HttpException(401, 'No existe el token'));
      }
   } catch (error) {
      console.log(error);
      next(new HttpException(401, 'Token no válido'));
   }
};
