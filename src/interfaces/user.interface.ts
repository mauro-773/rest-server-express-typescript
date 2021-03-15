import { Document } from 'mongoose';

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   imageUrl?: string;
   role: string;
   state?: boolean;
   google?: boolean;
}
