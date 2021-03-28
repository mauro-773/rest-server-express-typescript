import { Types } from 'mongoose';

import HttpException from '../exceptions/httpException';
import Category from '../models/category.model';
import User from '../models/user.model';
import Product from '../models/product.model';

import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/categories.interface';
import { IUser } from '../interfaces/user.interface';

class FindService {
   private collections: string[] = ['users', 'categories', 'products'];

   public async findByCollection(collection: string, term: string) {
      if (!this.collections.includes(collection)) {
         throw new HttpException(
            400,
            'La colección buscada no se encuentra disponible.'
         );
      }

      switch (collection) {
         case this.collections[0]:
            return await this.findUser(term);

         case this.collections[1]:
            return await this.findCategory(term);

         case this.collections[2]:
            return await this.findProduct(term);

         default:
            throw new HttpException(500, 'Opción no contemplada');
      }
   }

   private async findUser(term: string = '') {
      const isMongoId = Types.ObjectId.isValid(term);

      if (isMongoId) {
         const user: IUser | null = await User.findById(term);
         return user ? [user] : [];
      }

      // Busqueda por nombre
      const regex = new RegExp(term, 'i');
      const users: IUser[] = await User.find({
         $or: [{ nombre: regex }, { email: regex }],
         $and: [{ state: true }],
      });
      return users;
   }

   private async findCategory(term: string = '') {
      const isMongoId = Types.ObjectId.isValid(term);

      if (isMongoId) {
         const category: ICategory | null = await Category.findById(term);
         return category ? [category] : [];
      }

      // Busqueda por nombre
      const regex = new RegExp(term, 'i');
      const categories: ICategory[] = await Category.find({
         name: regex,
         state: true,
      });
      return categories;
   }

   private async findProduct(term: string = '') {
      const isMongoId = Types.ObjectId.isValid(term);

      if (isMongoId) {
         const product: IProduct | null = await Product.findById(term).populate(
            'category',
            'name'
         );
         return product ? [product] : [];
      }

      // Busqueda por nombre
      const regex = new RegExp(term, 'i');
      const products: IProduct[] = await Product.find({
         name: regex,
         state: true,
      }).populate('category', 'name');
      return products;
   }
}

export default FindService;
