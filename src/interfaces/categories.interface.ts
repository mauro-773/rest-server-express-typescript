import { IUser } from './user.interface';

export interface ICategory {
   _id: string;
   name: string;
   state: boolean;
   user: IUser;
}
