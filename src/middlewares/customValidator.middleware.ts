import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import HttpException from '../exceptions/httpException';

const collections: string[] = ['users', 'products'];
export const hasMongoIdOrCollection = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { collection, id } = req.params;

   const isMongoId = Types.ObjectId.isValid(id);
   if (!isMongoId) {
      throw new HttpException(400, 'El id no es un id válido de mongo');
   }

   if (!collections.includes(collection)) {
      throw new HttpException(400, 'La colección no existe');
   }

   next();
};

export const hasFile = (req: Request, res: Response, next: NextFunction) => {
   if (!req.files || Object.keys(req.files).length === 0) {
      throw new HttpException(400, 'No existe archivo para subir');
   }

   next();
};
