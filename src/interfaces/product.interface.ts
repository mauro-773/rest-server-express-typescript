import { ICategory } from './categories.interface';
import { IUser } from './user.interface';

export interface IProduct {
   name: string;
   state: boolean;
   user: IUser;
   price: number;
   category: ICategory;
   desc: string;
   available: boolean;
}
