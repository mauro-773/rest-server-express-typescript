import { Router } from 'express';

import CategoriesController from '../controllers/categories.controller';

import { CreateCategoryDto } from '../dtos';
import { IRoute } from '../interfaces/routes.interface';
import {
   verifyJwtMiddleware,
   validationMiddleware,
   isAdminMiddleware,
} from '../middlewares/';

/* PATH: /api/categories */
class CategoriesRoute implements IRoute {
   public router = Router();
   private categoriesController = new CategoriesController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.get('/', this.categoriesController.getCategories);
      this.router.get('/:id', this.categoriesController.getCategoryById);
      this.router.post(
         '/',
         [verifyJwtMiddleware, validationMiddleware(CreateCategoryDto)],
         this.categoriesController.postCategory
      );
      this.router.put(
         '/:id',
         validationMiddleware(CreateCategoryDto),
         this.categoriesController.putCategory
      );
      this.router.delete(
         '/:id',
         [verifyJwtMiddleware, isAdminMiddleware],
         this.categoriesController.deleteCategory
      );
   }
}

export default CategoriesRoute;
