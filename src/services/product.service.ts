import Category from '../models/category.model';
import Product from '../models/product.model';
import HttpException from '../exceptions/httpException';

import { ICategory } from '../interfaces/categories.interface';
import { IProduct } from '../interfaces/product.interface';
import { IUser } from '../interfaces/user.interface';
import { CreateProductDto, UpdateProductDto } from '../dtos';

class ProductService {
   private Product = Product;
   private Category = Category;
   private query = { state: true };

   public async fetchAllProducts(
      limit: number,
      skip: number
   ): Promise<IProduct[]> {
      const products: IProduct[] = await this.Product.find(this.query)
         .limit(limit)
         .skip(skip)
         .populate('user', 'name _id')
         .populate('category', 'name _id');
      return products;
   }

   public async countProducts(): Promise<number> {
      const totalCategories: number = await this.Product.countDocuments(
         this.query
      );
      return totalCategories;
   }

   public async fetchProductById(product_id: string): Promise<IProduct> {
      const product = (await this.Product.findById(product_id)
         .populate('user', 'name _id')
         .populate('category', 'name _id')) as IProduct;

      if (!product) throw new HttpException(404, 'El producto no existe');

      return product;
   }

   public async createProduct(
      productData: CreateProductDto,
      uid: IUser['_id']
   ): Promise<IProduct> {
      const nameProduct = productData.name.toUpperCase();
      const existsCategory = (await this.Category.findById(
         productData.category
      )) as ICategory;

      if (!existsCategory) {
         throw new HttpException(400, 'La categoría no existe');
      }

      if (!existsCategory.state) {
         throw new HttpException(400, 'La categoría está deshabilitada');
      }

      const existsProduct = (await this.Product.findOne({
         name: nameProduct,
      })) as IProduct;

      if (existsProduct) {
         throw new HttpException(
            400,
            'No pueden existir productos con el mismo nombre'
         );
      }

      const newProduct = new Product({
         user: uid,
         ...productData,
         name: nameProduct,
      });

      return await newProduct.save();
   }

   public async updateProduct(
      product_id: string,
      productData: UpdateProductDto
   ): Promise<IProduct> {
      const nameProduct = productData.name.toUpperCase();
      const existsProduct = (await this.Product.findById(
         product_id
      )) as IProduct;

      if (!existsProduct) {
         throw new HttpException(400, 'El producto no existe');
      }

      if (!existsProduct.state) {
         throw new HttpException(404, 'El producto está deshabilitado');
      }

      const newProduct = (await this.Product.findByIdAndUpdate(
         product_id,
         { ...productData, name: nameProduct },
         { new: true }
      )) as IProduct;

      return newProduct;
   }

   public async deleteProduct(product_id: string) {
      const existsProduct = (await this.Product.findById(
         product_id
      )) as IProduct;

      if (!existsProduct) {
         throw new HttpException(400, 'El producto no existe');
      }

      if (!existsProduct.state) {
         throw new HttpException(404, 'El producto ya está deshabilitado');
      }

      const newCategory = (await this.Product.findByIdAndUpdate(
         product_id,
         { state: false },
         { new: true }
      )) as IProduct;

      return newCategory;
   }
}

export default ProductService;
