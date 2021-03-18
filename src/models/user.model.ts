import { Schema, model, Document } from 'mongoose';
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

/*UserSchema.methods.toJSON = function(){
   const {__v, password, ...user} = this.toObject()
   return user
}*/

const User = model<IUser & Document>('User', UserSchema);

export default User;
