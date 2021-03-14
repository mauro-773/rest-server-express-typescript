import { Request, Response } from 'express';

class UserController {
   public getUsers = (req: Request, res: Response): Response => {
      return res.json({
         ok: true,
         msg: 'Get users',
      });
   };

   public postUser = (req: Request, res: Response): Response => {
      const { name, age } = req.body;

      return res.json({
         ok: true,
         msg: 'Post user',
         name,
         age,
      });
   };

   public putUser = (req: Request, res: Response): Response => {
      const { id } = req.params;

      return res.json({
         ok: true,
         msg: 'Put users',
         id,
      });
   };

   public patchUser = (req: Request, res: Response): Response => {
      return res.json({
         ok: true,
         msg: 'Patch users',
      });
   };

   public deleteUser = (req: Request, res: Response): Response => {
      return res.json({
         ok: true,
         msg: 'Delete users',
      });
   };
}

export default UserController;
