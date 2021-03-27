import { Router } from 'express';

import ProductsController from '../controllers/products.controller';

import { CreateProductDto, UpdateProductDto } from '../dtos';
import { IRoute } from '../interfaces/routes.interface';
import {
   isAdminMiddleware,
   validationMiddleware,
   verifyJwtMiddleware,
} from '../middlewares';

class ProductsRoute implements IRoute {
   public router = Router();
   private productsController = new ProductsController();

   constructor() {
      this.initializeRoute();
   }

   private initializeRoute() {
      this.router.get('/', this.productsController.getProducts);

      this.router.get('/:id', this.productsController.getProductById);

      this.router.post(
         '/',
         [verifyJwtMiddleware, validationMiddleware(CreateProductDto)],
         this.productsController.postProduct
      );

      this.router.put(
         '/:id',
         validationMiddleware(UpdateProductDto),
         this.productsController.putProduct
      );

      this.router.delete(
         '/:id',
         [verifyJwtMiddleware, isAdminMiddleware],
         this.productsController.deleteProduct
      );
   }
}

export default ProductsRoute;
