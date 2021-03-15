import { Request, Response, NextFunction } from 'express';

import UserService from '../services/user.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/user.interface';

class UserController {
   private userService = new UserService();

   public getUsers = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const users: IUser[] = await this.userService.fetchAllUsers();
         return res.json({
            ok: true,
            users,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public postUser = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { name, email, password, role }: CreateUserDto = req.body;
         const userData: CreateUserDto = { name, email, password, role };
         const newUser: IUser = await this.userService.createUser(userData);

         return res.json({
            ok: true,
            msg: 'Usuario creado correctamente',
            newUser,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
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
