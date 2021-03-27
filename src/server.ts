import express, { Application } from 'express';
import cors from 'cors';

import AuthRoute from './routes/auth.route';
import FindRoute from './routes/find.route';
import CategoriesRoute from './routes/categories.route';
import UsersRoute from './routes/users.route';
import ProductsRoute from './routes/products.route';

import { dbConnection } from './database';
import { errorMiddleware } from './middlewares';

class Server {
   private app: Application;
   private port: string;
   private paths = {
      auth: '/api/auth',
      find: '/api/find',
      categories: '/api/categories',
      users: '/api/users',
      products: '/api/products',
   };

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '4000';
   }

   private async connectToDatabase() {
      await dbConnection();
   }

   private initializeMiddlewares() {
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.static(__dirname + '/public'));
   }

   private errorHandling() {
      this.app.use(errorMiddleware);
   }

   private initializeRoutes() {
      this.app.use(this.paths.auth, new AuthRoute().router);
      this.app.use(this.paths.find, new FindRoute().router);
      this.app.use(this.paths.categories, new CategoriesRoute().router);
      this.app.use(this.paths.users, new UsersRoute().router);
      this.app.use(this.paths.products, new ProductsRoute().router);
   }

   initializeServer() {
      this.connectToDatabase();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.errorHandling();

      this.app.listen(this.port, () => {
         console.log(`Server running on port: ${this.port}`);
      });
   }
}

export default Server;
