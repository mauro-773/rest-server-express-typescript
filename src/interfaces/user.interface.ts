export interface IUser {
   _id?: string;
   name: string;
   email?: string;
   password: string;
   imageUrl?: string;
   role: string;
   state?: boolean;
   google?: boolean;
}
