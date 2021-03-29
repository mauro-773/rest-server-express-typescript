import { Request, Response, NextFunction } from 'express';

import UserService from '../services/user.service';
import { CreateUserDto } from '../dtos';
import { IUser } from '../interfaces/user.interface';

class UserController {
   private userService = new UserService();

   public getUsers = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { limit = 5, skip = 0 } = req.query;

         const users: IUser[] = await this.userService.fetchAllUsers(
            Number(limit),
            Number(skip)
         );
         const totalUsers: number = await this.userService.countUsers();

         return res.json({
            ok: true,
            users,
            totalUsers,
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
         const newUser: IUser = await this.userService.createUser({
            name,
            email,
            password,
            role,
         });

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

   public putUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { userId } = req.params;
         const { _id, email, google, ...userData }: IUser = req.body;
         const userUpdated: IUser = await this.userService.updateUser(
            userId,
            userData
         );

         return res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            userUpdated,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public patchUser = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         return res.json({
            ok: true,
            msg: 'Patch users',
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public deleteUser = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { userId } = req.params;

         const deletedUser: IUser = await this.userService.deleteUser(userId);

         return res.json({
            ok: true,
            msg: 'Usuario borrado correctamente',
            deletedUser,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default UserController;
