import Category from '../models/category.model';
import HttpException from '../exceptions/httpException';

import { ICategory } from '../interfaces/categories.interface';
import { IUser } from '../interfaces/user.interface';

class CategoryServices {
   private Category = Category;
   private query = { state: true };

   public async fetchAllCategories(
      limit: number,
      skip: number
   ): Promise<ICategory[]> {
      const categories: ICategory[] = await this.Category.find(this.query)
         .limit(limit)
         .skip(skip)
         .populate('user', 'name _id');
      return categories;
   }

   public async countCategories(): Promise<number> {
      const totalCategories: number = await this.Category.countDocuments(
         this.query
      );
      return totalCategories;
   }

   public async fetchCategoryById(category_id: string): Promise<ICategory> {
      const category = (await this.Category.findById(category_id).populate(
         'user',
         'name _id'
      )) as ICategory;

      if (!category) throw new HttpException(404, 'La categoría no existe');

      return category;
   }

   public async createCategory(
      name: string,
      uid: IUser['_id']
   ): Promise<ICategory> {
      const existsCategory = (await this.Category.findOne({
         name,
      })) as ICategory;
      if (existsCategory) {
         throw new HttpException(400, 'La categoría ya existe');
      }

      const newCategory = new Category({ name, user: uid });

      return await newCategory.save();
   }

   public async updateCategory(
      category_id: string,
      name: string
   ): Promise<ICategory> {
      const existsCategory = (await this.Category.findById(
         category_id
      )) as ICategory;

      if (!existsCategory) {
         throw new HttpException(400, 'La categoría no existe');
      }

      if (!existsCategory.state) {
         throw new HttpException(404, 'La categoría está deshabilitada');
      }

      const newCategory = (await this.Category.findByIdAndUpdate(
         category_id,
         { name },
         { new: true }
      )) as ICategory;

      return newCategory;
   }

   public async deleteCategory(category_id: string) {
      const existsCategory = (await this.Category.findById(
         category_id
      )) as ICategory;

      if (!existsCategory) {
         throw new HttpException(400, 'La categoría no existe');
      }

      if (!existsCategory.state) {
         throw new HttpException(404, 'La categoría ya está deshabilitada');
      }

      const newCategory = (await this.Category.findByIdAndUpdate(
         category_id,
         { state: false },
         { new: true }
      )) as ICategory;

      return newCategory;
   }
}

export default CategoryServices;
