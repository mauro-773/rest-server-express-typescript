import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validationMiddleware = (type: any) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const errors = await validate(plainToClass(type, req.body), {
         skipMissingProperties: false,
      });

      if (errors.length > 0) {
         return res.status(400).json({
            ok: false,
            errors: errors.map((error: ValidationError) => ({
               property: error.property,
               errors: error.constraints,
            })),
         });
      }
      return next();
   };
};
