import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

export const errorMiddleware = (
   error: HttpException,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const status: number = error.statusCode || 500;
   const message: string = error.message || 'Algo salió mal';

   return res.status(status).json({ ok: false, message });
};
