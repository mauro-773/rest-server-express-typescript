import { Request, Response, NextFunction } from 'express';

import ProductService from '../services/product.service';

import { RequestWithUid } from '../interfaces/auth.interface';
import { CreateProductDto } from '../dtos';
import { IProduct } from '../interfaces/product.interface';

class ProductsController {
   private productService = new ProductService();

   public getProducts = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { limit = 5, skip = 0 } = req.query;
         const products: IProduct[] = await this.productService.fetchAllProducts(
            Number(limit),
            Number(skip)
         );
         const totalProducts = await this.productService.countProducts();

         res.json({
            ok: true,
            products,
            totalProducts,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public getProductById = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;

         const product: IProduct = await this.productService.fetchProductById(
            id
         );

         res.json({
            ok: true,
            product,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public postProduct = async (
      req: RequestWithUid,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { uid }: RequestWithUid = req;
         const productData: CreateProductDto = req.body;

         const product: IProduct = await this.productService.createProduct(
            productData,
            uid
         );

         res.json({
            ok: true,
            msg: 'Producto creado',
            product,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public putProduct = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;
         const { state, category, user, ...productData } = req.body;

         const product: IProduct = await this.productService.updateProduct(
            id,
            productData
         );

         res.json({
            ok: true,
            msg: 'Producto actualizado',
            product,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };

   public deleteProduct = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { id } = req.params;

         const product: IProduct = await this.productService.deleteProduct(id);

         res.json({
            ok: true,
            msg: 'Producto deshabilitado',
            product,
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default ProductsController;
