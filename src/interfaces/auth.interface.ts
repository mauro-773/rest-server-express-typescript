import { Request } from 'express';
import { IUser } from './user.interface';

export interface RequestWithUid extends Request {
   uid?: IUser['_id'];
}

export interface DataStoredInToken {
   uid: string;
}
