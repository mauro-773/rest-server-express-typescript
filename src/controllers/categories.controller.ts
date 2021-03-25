import { Request, Response, NextFunction } from 'express';
import { RequestWithUid } from '../interfaces/auth.interface';

import CategoryService from '../services/category.service';

class CategoriesController {
   private categoryService = new CategoryService();

   public getCategories = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { limit = 5, skip = 0 } = req.query;
         const categories = await this.categoryService.fetchAllCategories(
            Number(limit),
            Number(skip)
         );
         const totalCategories = await this.categoryService.countCategories();

         res.json({
            ok: true,
            categories,
            totalCategories,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public getCategoryById = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;
         const category = await this.categoryService.fetchCategoryById(id);

         res.json({
            ok: true,
            category,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public postCategory = async (
      req: RequestWithUid,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { uid }: RequestWithUid = req;
         const name: string = req.body.name.toUpperCase();

         const category = await this.categoryService.createCategory(name, uid);

         res.json({
            ok: true,
            msg: 'Categoría creada',
            category,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public putCategory = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;
         const name: string = req.body.name.toUpperCase();

         const category = await this.categoryService.updateCategory(id, name);

         res.json({
            ok: true,
            msg: 'Categoría actualizada',
            category,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public deleteCategory = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;
         const category = await this.categoryService.deleteCategory(id);

         res.json({
            ok: true,
            msg: 'Categoría deshabilitada',
            category,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default CategoriesController;
