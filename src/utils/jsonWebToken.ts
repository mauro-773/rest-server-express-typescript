import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

export const generateJWT = (uid: IUser['_id']) => {
   return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED || 'palabra-secreta',
         {
            expiresIn: '2h',
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject('No se pudo generar el token');
            }

            resolve(token);
         }
      );
   });
};
