import { NextFunction, Response } from 'express';
import HttpException from '../exceptions/httpException';

import User from '../models/user.model';
import { RequestWithUid } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

// Verifica si el usuario es ADMIN_ROLE
export const isAdminMiddleware = async (
   req: RequestWithUid,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const { uid } = req;
      if (!uid) {
         next(new HttpException(500, 'No existe usuario en sesión/token'));
      }

      const user = (await User.findById(uid)) as IUser;

      if (user.role !== 'ADMIN_ROLE') {
         next(
            new HttpException(
               403,
               'No tiene los permisos para realizar esta acción'
            )
         );
      }

      next();
   } catch (error) {
      console.log(error);
   }
};

// Verifica si existe el rol mandado por argumento
export const hasRoleMiddleware = (rols: string[]) => {
   return async (req: RequestWithUid, res: Response, next: NextFunction) => {
      try {
         const { uid } = req;
         if (!uid) {
            next(new HttpException(500, 'No existe usuario en sesión/token'));
         }

         const user = (await User.findById(uid)) as IUser;

         if (!rols.includes(user.role)) {
            next(
               new HttpException(
                  403,
                  'No tiene los permisos para realizar esta acción'
               )
            );
         }

         next();
      } catch (error) {
         console.log(error);
      }
   };
};
