import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   imageUrl: {
      type: String,
   },
   role: {
      type: String,
      required: true,
      enum: ['ADMIN_ROLE', 'USER_ROLE'],
   },
   state: {
      type: Boolean,
      default: true,
   },
   google: {
      type: Boolean,
      default: false,
   },
});

const User = model<IUser>('User', UserSchema);

export default User;
