import { Request } from 'express';
import { TokenPayload } from 'google-auth-library';
import { IUser } from './user.interface';

export interface RequestWithUid extends Request {
   uid?: IUser['_id'];
}

export interface DataStoredInToken {
   uid: string;
}

export interface Login {
   token: any;
   user: IUser;
}
export interface GoogleSignIn {
   name: string;
   email: string;
   imageUrl: string;
}

export interface IGoogleSignin extends TokenPayload {
   name: string;
   email: string;
   picture: string;
}
