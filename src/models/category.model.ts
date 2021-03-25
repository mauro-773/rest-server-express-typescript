import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../interfaces/categories.interface';

const CategorySchema: Schema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   state: {
      type: Boolean,
      default: true,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
});

const Category = model<ICategory & Document>('Category', CategorySchema);

export default Category;
