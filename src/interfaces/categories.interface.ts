import { IUser } from './user.interface';

export interface ICategory {
   name: string;
   state: boolean;
   user: IUser;
}
