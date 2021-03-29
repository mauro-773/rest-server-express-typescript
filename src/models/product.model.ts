import { Schema, model, Document } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema: Schema = new Schema({
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
   price: {
      type: Number,
      default: 0,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   },
   desc: {
      type: String,
      required: true,
   },
   available: {
      type: Boolean,
      default: true,
   },
   imageUrl: {
      type: String,
   },
});

const Product = model<IProduct & Document>('Product', ProductSchema);

export default Product;
