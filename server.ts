import express, { Application } from 'express';
import cors from 'cors';

import UserRoute from './routes/user.route';

class Server {
   private app: Application;
   private port: string;

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '4000';
   }

   private initializeMiddlewares() {
      this.app.use(cors());
      this.app.use(express.json());
   }

   private initializeRoutes() {
      this.app.use('/api/users', new UserRoute().router);
   }

   initializeServer() {
      this.initializeMiddlewares();
      this.initializeRoutes();

      this.app.listen(this.port, () => {
         console.log(`Server running on port: ${this.port}`);
      });
   }
}

export default Server;
